// src/framework/api/productApi.js
import { useGetEntitiesQuery } from '../api'

const base = 'categories'

// Hook para obtener productos por usuario
export const useGetAllCategories = () => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
  })

  return {
    categories: data,
    isLoadingCategories: isLoading,
    error,
  }
}

// Puedes añadir aquí más hooks según sean necesarios
