import { createApi } from '@reduxjs/toolkit/query/react'
import { db } from '../firebaseConfig'
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
} from 'firebase/firestore'

// Crear un baseQuery personalizado para Firebase
const firebaseBaseQuery = async ({
  method,
  path,
  data,
  filters,
  populate,
  incrementField,
}) => {
  const collectionRef = collection(db, path)
  try {
    switch (method) {
      case 'GET':
        let q
        if (filters && Object.keys(filters).length > 0 && filters.id) {
          // Fetch específico del documento
          const docRef = doc(db, path, filters.id)
          const docSnapshot = await getDoc(docRef)
          if (!docSnapshot.exists()) {
            console.log('No such document!')
            return { data: [] }
          }
          const data = docSnapshot.data()
          if (populate.length > 0) {
            const populatedData = {}
            populate.forEach((field) => {
              if (data.hasOwnProperty(field)) {
                populatedData[field] = data[field]
              }
            })
            return { data: [{ id: docSnapshot.id, ...populatedData }] }
          }
          return { data: [{ id: docSnapshot.id, ...data }] }
        } else {
          // Consulta general con posibles filtros
          q = query(collectionRef)
          if (filters && Object.keys(filters).length > 0) {
            const filterClauses = Object.entries(filters).map(
              ([key, value]) => {
                if (Array.isArray(value)) {
                  return where(key, 'array-contains-any', value)
                } else {
                  return where(key, '==', value)
                }
              },
            )
            q = query(collectionRef, ...filterClauses)
          }
          const querySnapshot = await getDocs(q)
          return {
            data: querySnapshot.docs.map((doc) => {
              const data = doc.data()
              if (populate.length > 0) {
                const populatedData = {}
                populate.forEach((field) => {
                  if (data.hasOwnProperty(field)) {
                    populatedData[field] = data[field]
                  }
                })
                return { id: doc.id, ...populatedData }
              }
              return { id: doc.id, ...data }
            }),
          }
        }

      case 'POST':
        const docRef = await addDoc(collectionRef, data)
        await updateDoc(docRef, { id: docRef.id }) // Update document to include the id
        return { data: { id: docRef.id, ...data } }

      case 'DELETE':
        const docToDeleteRef = doc(db, path, data.id) // Assuming `data` has an id field
        await deleteDoc(docToDeleteRef)
        return { data: { id: data.id } } // or some success indicator

      case 'PUT':
        const docToUpdateRef = doc(db, path, data.id)

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
export const api = createApi({
  reducerPath: 'api',
  baseQuery: firebaseBaseQuery,
  tagTypes: ['Entity'],
  endpoints: (builder) => ({
    getEntities: builder.query({
      query: ({ collectionPath, filters = {}, populate = [] }) => ({
        method: 'GET',
        path: collectionPath,
        filters,
        populate,
      }),
      providesTags: [{ type: 'Entity' }],
    }),
    addEntity: builder.mutation({
      query: ({ collectionPath, data }) => ({
        method: 'POST',
        path: collectionPath,
        data,
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    deleteEntity: builder.mutation({
      query: ({ collectionPath, docId }) => ({
        method: 'DELETE',
        path: collectionPath,
        data: { id: docId },
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
    updateEntity: builder.mutation({
      query: ({ collectionPath, data, incrementField }) => ({
        method: 'PUT',
        path: collectionPath,
        data,
        incrementField,
      }),
      invalidatesTags: [{ type: 'Entity' }],
    }),
  }),
})

export const {
  useGetEntitiesQuery,
  useAddEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
} = api
