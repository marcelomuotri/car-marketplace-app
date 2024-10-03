import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon'

const BackButton = ({ color = 'white', fallbackRoute = null }) => {
  const router = useRouter()

  const handleBackPress = () => {
    if (fallbackRoute) {
      router.push(fallbackRoute) // Si se proporciona una ruta de fallback, navega a esa ruta
    } else {
      router.back() // Si no hay ruta de fallback, usa router.back()
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleBackPress}>
      <ArrowLeftIcon color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
})

export default BackButton
