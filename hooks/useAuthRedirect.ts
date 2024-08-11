import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'
import { RootState } from '@/state/store'

const useAuthRedirect = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])
}

export default useAuthRedirect
