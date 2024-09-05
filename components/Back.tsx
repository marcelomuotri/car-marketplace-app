import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon'

const BackButton = ({ color = 'white' }) => {
  const router = useRouter()

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
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
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
  },
})

export default BackButton
