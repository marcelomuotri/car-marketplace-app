import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'
import { RootState } from '@/state/store'

const useAuthRedirect = () => {
  const { user, reauthenticating } = useSelector(
    (state: RootState) => state.auth,
  )

  useEffect(() => {
    if (user && !reauthenticating) {
      // Solo redirigir si el usuario está logueado y no está en proceso de reautenticación
      router.replace('/')
    }
  }, [user, reauthenticating])
}

export default useAuthRedirect
