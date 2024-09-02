// src/framework/api/productApi.js
import { useAddEntityMutation } from '../api'
import { SupportQueryUpload } from '@/types'

const base = 'support'

export const useAddSupport = () => {
  const [addSupport, { isLoading, error }] = useAddEntityMutation()

  const addNewSupport = async (supportData: SupportQueryUpload) => {
    try {
      const result = await addSupport({
        collectionPath: base,
        data: {
          ...supportData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
      return result
    } catch (e) {
      console.error('Failed to add support query:', e)
    }
  }

  return { addNewSupport, isLoading, error }
}
