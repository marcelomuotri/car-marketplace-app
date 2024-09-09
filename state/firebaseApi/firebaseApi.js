import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDoc,
  increment,
  Timestamp,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../../firebaseConfig'

// Función para obtener un documento específico

export const convertIsoStringToTimestamp = (data) => {
  const convertedData = {}

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]

      // Verifica si el valor es un ISOString
      if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        // Convierte el ISOString a Firebase Timestamp
        convertedData[key] = Timestamp.fromDate(new Date(value))
      } else {
        convertedData[key] = value
      }
    }
  }

  return convertedData
}

export const convertTimestampToIsoString = (data) => {
  const convertedData = {}

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]

      // Verifica si el valor es un Firebase Timestamp
      if (value instanceof Timestamp) {
        // Convierte el Firebase Timestamp a ISOString
        convertedData[key] = value.toDate().toISOString()
      } else {
        convertedData[key] = value
      }
    }
  }

  return convertedData
}

const getDocumentById = async (collectionRef, id, populate) => {
  const docRef = doc(collectionRef, id)
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists()) {
    console.log('No such document!')
    return null
  }

  let data = docSnapshot.data()

  data = convertTimestampToIsoString(data)

  return { id: docSnapshot.id, ...populateFields(data, populate) }
}

// Función para manejar la población de campos
const populateFields = (data, populate) => {
  if (populate.length > 0) {
    const populatedData = {}
    populate.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        populatedData[field] = data[field]
      }
    })
    return populatedData
  }
  return data
}

// Función para manejar consultas con filtros
const getFilteredDocuments = async (
  collectionRef,
  filters,
  populate,
  limitCount,
  cursor,
) => {
  let q = query(collectionRef)
  console.log(filters, 'filtros en firebase')

  if (filters && Object.keys(filters).length > 0) {
    const filterClauses = Object.entries(filters).map(([key, value]) => {
      if (Array.isArray(value)) {
        return where(key, 'array-contains-any', value)
      } else {
        return where(key, '==', value)
      }
    })

    q = query(collectionRef, ...filterClauses)
  }

  q = query(q, limit(limitCount))

  console.log(cursor, 'cursor')

  // Si hay un cursor, empezar después del último documento visible
  if (cursor) {
    const lastDocRef = await getDoc(doc(collectionRef, cursor))
    q = query(q, startAfter(lastDocRef))
  }

  const querySnapshot = await getDocs(q)

  return {
    data: querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...populateFields(convertTimestampToIsoString(data), populate),
      }
    }),
  }
}

// Función para manejar la consulta por múltiples IDs
const getDocumentsByIds = async (collectionRef, ids, populate) => {
  const promises = ids.map(async (id) => {
    return getDocumentById(collectionRef, id, populate)
  })

  const results = await Promise.all(promises)
  return { data: results.filter((result) => result !== null) }
}

// Crear un baseQuery personalizado para Firebase
export const firebaseBaseQuery = async ({
  method,
  path,
  data,
  filters,
  populate,
  incrementField,
  limitCount,
  cursor,
}) => {
  const collectionRef = collection(db, path)

  try {
    switch (method) {
      case 'GET':
        if (filters && filters.id) {
          // Caso de obtener documento por ID
          return {
            data: [await getDocumentById(collectionRef, filters.id, populate)],
          }
        } else {
          // Caso de obtener documentos con filtros
          // en este solo tenemos que poner el limit y start After
          const filteredDocuments = await getFilteredDocuments(
            collectionRef,
            filters,
            populate,
            limitCount,
            cursor,
          )
          console.log(filteredDocuments)
          return filteredDocuments
        }
      case 'GET_BY_IDS':
        //aca es si viene con multiples ids
        if (filters && filters.ids && filters.ids.length > 0) {
          // Caso de obtener múltiples documentos por ID
          return await getDocumentsByIds(collectionRef, filters.ids, populate)
        } else {
          return { data: [] }
        }

      case 'POST':
        const parsedData = convertIsoStringToTimestamp(data)
        const docRef = await addDoc(collectionRef, parsedData)
        await updateDoc(docRef, { id: docRef.id }) // Update document to include the id
        return { data: { id: docRef.id, ...data } }

      case 'DELETE':
        const docToDeleteRef = doc(db, path, data.id) // Assuming `data` has an id field
        await deleteDoc(docToDeleteRef)
        return { data: { id: data.id } } // or some success indicator,

      case 'PUT':
        const docToUpdateRef = doc(db, path, data.id)
        const parsedUpdateData = convertIsoStringToTimestamp(data)

        if (incrementField) {
          await updateDoc(docToUpdateRef, {
            [incrementField]: increment(1), // Incrementa el campo especificado en 1
          })
        } else {
          await updateDoc(docToUpdateRef, data)
        }

        return { data: { id: data.id, ...data } }

      default:
        throw new Error('Method not supported')
    }
  } catch (err) {
    console.error(err)
    return { error: err.message }
  }
}
