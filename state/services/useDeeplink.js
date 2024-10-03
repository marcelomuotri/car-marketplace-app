import { useEffect, useState } from 'react'
import * as Linking from 'expo-linking'

const useDeepLink = () => {
  const [linkedURL, setLinkedURL] = useState(null)

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL() // Solo para cuando la app se abre desde un estado cerrado
      if (initialUrl) {
        setLinkedURL(decodeURI(initialUrl)) // Guardamos la URL inicial
      }
    }

    getUrlAsync() // Solo maneja la URL inicial
  }, [])

  const resetURL = () => setLinkedURL(null)

  return { linkedURL, resetURL }
}

export default useDeepLink
