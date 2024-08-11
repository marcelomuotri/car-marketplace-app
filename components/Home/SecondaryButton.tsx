import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '../ThemedText'

interface SecondaryButtonProps {
  title: string
  onPress: () => void
}

const SecondaryButton = ({ title, onPress }: SecondaryButtonProps) => {
  const color = useThemeColor({}, 'tint')
  const styles = createStyles(color as string)

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </TouchableOpacity>
  )
}

export default SecondaryButton

const createStyles = (color: string) => {
  return StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 6,
      alignItems: 'center', // Centra el texto horizontalmente
    },
    title: {
      color: color, // Color del texto
      fontSize: 14,
      fontWeight: 500,
    },
  })
}
