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

// Función para manejar consultas con filtros
import { orderBy } from 'firebase/firestore'

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
  orderByField = null, // Campo por el cual ordenar
  orderDirection = 'asc', // Dirección de orden (asc o desc)
) => {
  let q = collectionRef

  if (filters && Object.keys(filters).length > 0) {
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && key === 'size') {
        q = query(q, where(key, 'in', value))
      } else if (Array.isArray(value)) {
        q = query(q, where(key, 'array-contains-any', value))
      } else if (key === 'title') {
        value = value.toLowerCase()
        const startValue = value
        const endValue = value + '\uf8ff'
        q = query(
          q,
          where('title', '>=', startValue),
          where('title', '<=', endValue),
        )
      } else {
        q = query(q, where(key, '==', value))
      }
    })
  }

  // Añadir el orderBy si se proporciona un campo de ordenación
  if (orderByField) {
    q = query(q, orderBy(orderByField, orderDirection))
  }

  // Limitar el número de resultados
  q = query(q, limit(limitCount))

  // Manejar la paginación con el cursor
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
  return { data: results?.filter((result) => result !== null) }
}

// Crear un baseQuery personalizado para Firebase
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
  orderByField = null, // Campo para el orderBy
  orderDirection = 'asc', // Dirección de orden
}) => {
  const collectionRef = collection(db, path)

  try {
    switch (method) {
      case 'GET':
        if (filters && filters.id) {
          return {
            data: [await getDocumentById(collectionRef, filters.id, populate)],
          }
        } else {
          const filteredDocuments = await getFilteredDocuments(
            collectionRef,
            filters,
            populate,
            limitCount,
            cursor,
            orderByField, // Pasar el campo de orden
            orderDirection, // Pasar la dirección de orden
          )
          return filteredDocuments
        }
      case 'GET_BY_IDS':
        if (filters && filters.ids && filters.ids.length > 0) {
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
        const docToDeleteRef = doc(db, path, data.id)
        await deleteDoc(docToDeleteRef)
        return { data: { id: data.id } }

      case 'PUT':
        const docToUpdateRef = doc(db, path, data.id)
        const parsedUpdateData = convertIsoStringToTimestamp(data)

        if (incrementField) {
          await updateDoc(docToUpdateRef, {
            [incrementField]: increment(1),
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
