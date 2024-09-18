import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '../ThemedText'

interface SecondaryButtonProps {
  title: string
  onPress: () => void
  underline?: boolean // Hacer 'underline' opcional
  style?: ViewStyle // Recibir estilos externos para el botón
  textStyle?: TextStyle // Recibir estilos externos para el texto
}

const SecondaryButton = ({
  title,
  onPress,
  underline = false,
  style, // Añadir prop para estilos personalizados del botón
  textStyle, // Añadir prop para estilos personalizados del texto
}: SecondaryButtonProps) => {
  const color = useThemeColor({}, 'tint')
  const styles = createStyles(color as string, underline)

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <ThemedText style={[styles.title, textStyle]}>{title}</ThemedText>
    </TouchableOpacity>
  )
}

export default SecondaryButton

const createStyles = (color: string, underline: boolean) => {
  return StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 6,
      alignItems: 'center', // Centra el texto horizontalmente
    },
    title: {
      color: color, // Color del texto
      fontSize: 14,
      fontWeight: '500' as TextStyle['fontWeight'], // Actualizar para mantener consistencia de tipo
      textDecorationLine: underline ? 'underline' : 'none', // Aplica subrayado si 'underline' es true
    },
  })
}
