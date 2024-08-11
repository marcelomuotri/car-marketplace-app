// src/framework/api/productApi.js
import { useGetEntitiesQuery } from '../api'

const base = 'users'

export const useGetUserById = (id: string) => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    filters: { id: id },
  })

  return {
    user: data ? data[0] : null,
    isLoadingUser: isLoading,
    error,
  }
}

// Puedes añadir aquí más hooks según sean necesarios
