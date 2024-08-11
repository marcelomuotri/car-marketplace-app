import AsyncStorage from '@react-native-async-storage/async-storage'

// Guardar el token
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token)
  } catch (e) {
    // Guardar error
    console.error(e)
  }
}

// Obtener el token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken')
    if (token !== null) {
      return token
    }
  } catch (e) {
    console.error(e)
  }
}

// Eliminar el token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken')
  } catch (e) {
    // Eliminar error
    console.error(e)
  }
}
