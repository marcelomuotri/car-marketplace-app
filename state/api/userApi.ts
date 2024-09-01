// src/framework/api/productApi.js
import { useGetEntitiesQuery, useUpdateEntityMutation } from '../api'

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

export const useUpdateUser = () => {
  const [updateUser, { isLoading: isUpdating, error }] =
    useUpdateEntityMutation()

  const updateUserData = async (userData: any) => {
    try {
      const result = await updateUser({
        collectionPath: base,
        data: userData,
      })
      return result
    } catch (e) {
      console.error('Failed to update product:', e)
    }
  }

  return { updateUserData, isUpdating, error }
}

// Puedes añadir aquí más hooks según sean necesarios
