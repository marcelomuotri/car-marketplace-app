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
  Timestamp,
  limit,
  startAfter,
} from 'firebase/firestore'
import { firebaseBaseQuery } from './firebaseApi/firebaseApi'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: firebaseBaseQuery,
  tagTypes: ['Entity'],
  endpoints: (builder) => ({
    getEntities: builder.query({
      query: ({
        collectionPath,
        filters = {},
        populate = [],
        limitCount = 30,
        cursor = null,
      }) => ({
        method: 'GET',
        path: collectionPath,
        filters,
        populate,
        limitCount,
        cursor,
      }),
      providesTags: [{ type: 'Entity' }],
    }),
    getEntitiesByIds: builder.query({
      query: ({ collectionPath, ids = [], populate = [] }) => ({
        method: 'GET_BY_IDS',
        path: collectionPath,
        filters: { ids },
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
  useGetEntitiesByIdsQuery,
  useAddEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
} = api
