import { createApi } from '@reduxjs/toolkit/query/react'
import { firebaseBaseQuery } from '../firebaseApi/firebaseApi'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: firebaseBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        collectionPath,
        filters = {},
        populate = [],
        limitCount = 30,
        cursor = null,
        orderByField,
        orderDirection,
      }) => ({
        method: 'GET',
        path: collectionPath,
        filters,
        populate,
        limitCount,
        cursor,
        orderByField,
        orderDirection,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { collectionPath, filters, orderByField, orderDirection } =
          queryArgs

        // Serialize filters
        const sortedFilters = Object.keys(filters)
          .sort()
          .reduce((acc, key) => {
            acc[key] = filters[key]
            return acc
          }, {})

        // Include orderByField and orderDirection in the cache key
        return `${endpointName}-${collectionPath}-${JSON.stringify(sortedFilters)}-${orderByField}-${orderDirection}`
      },
      merge: (currentCache, newItems) => {
        const mergedCache = [...currentCache]

        newItems.forEach((newItem) => {
          const exists = mergedCache.some(
            (cacheItem) => cacheItem.id === newItem.id,
          )
          if (!exists) {
            mergedCache.push(newItem)
          }
        })

        return mergedCache
      },
      forceRefetch({ currentArg, previousArg }) {
        const cursorChanged = currentArg?.cursor !== previousArg?.cursor

        return cursorChanged
      },
      providesTags: [{ type: 'Product' }],
      //keepUnusedDataFor: 0, // Esto hará que los datos no se mantengan cacheados
      //refetchOnMountOrArgChange: true, // Forzar refetch al cambiar los filtros o montarse el componente
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
