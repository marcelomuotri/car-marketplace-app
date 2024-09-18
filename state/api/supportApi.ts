// src/framework/api/productApi.js
import { useAddEntityMutation } from '../api'
import { SupportQueryUpload } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const base = 'support'

export const useAddSupport = () => {
  const [addSupport, { isLoading, error }] = useAddEntityMutation()
  const userData = useSelector((state: RootState) => state.auth.userData)

  const addNewSupport = async (supportData: SupportQueryUpload) => {
    try {
      const result = await addSupport({
        collectionPath: base,
        data: {
          ...supportData,
          createdAt: new Date().toISOString(),
          email: userData?.userEmail,
          name: userData?.name || null,
          uid: userData.uid,
          type: 'app',
        },
      })
      return result
    } catch (e) {
      console.error('Failed to add support query:', e)
    }
  }

  return { addNewSupport, isLoading, error }
}
