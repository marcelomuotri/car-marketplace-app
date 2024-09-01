// src/framework/api/productApi.js
import {
  useAddEntityMutation,
  useDeleteEntityMutation,
  useGetEntitiesQuery,
} from '../api'
import { FavoritesUpload } from '@/types'

const base = 'favorites'

// Hook para obtener productos por usuario
export const useGetAllFavorites = ({ filters }: any) => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    filters: { ...filters },
  })

  return {
    favorites: data,
    isLoading,
    error,
  }
}

export const useGetOneFavorite = ({ filters }: any) => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    filters: { ...filters },
  })

  return {
    favorite: data ? data[0] : {},
    isLoadingFavorite: isLoading,
    error,
  }
}

// Hook para agregar un producto
export const useAddFavorite = () => {
  const [addFavorite, { isLoading, error }] = useAddEntityMutation()

  const addNewFavorite = async (favoriteData: FavoritesUpload) => {
    try {
      const result = await addFavorite({
        collectionPath: base,
        data: {
          ...favoriteData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
      return result
    } catch (e) {
      console.error('Failed to add product:', e)
    }
  }

  return { addNewFavorite, isLoading, error }
}

export const useDeleteFavorite = () => {
  const [deleteFavorite, { isLoading, error }] = useDeleteEntityMutation()

  const removeFavorite = async (productId: string) => {
    try {
      const result = await deleteFavorite({
        collectionPath: base,
        docId: productId,
      })
      return result
    } catch (e) {
      console.log('Failed to delete product:', e)
    }
  }

  return { removeFavorite, isLoading, error }
}
