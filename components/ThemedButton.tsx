import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'

interface ThemedButtonProps {
  title: string
  onPress: () => void
  style?: any
  textStyle?: any
}

const ThemedButton = ({
  title,
  onPress,
  style,
  textStyle,
}: ThemedButtonProps) => {
  const tint = useThemeColor({}, 'tint')
  const buttonTextColor = useThemeColor({}, 'buttontextColor')

  const styles = createStyles({
    tint: tint as string,
    buttonTextColor: buttonTextColor as string,
  })

  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <ThemedText style={[styles.text, textStyle]}>{title}</ThemedText>
    </Pressable>
  )
}

const createStyles = ({
  tint,
  buttonTextColor,
}: {
  tint: string
  buttonTextColor: string
}) => {
  return StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 4,
      alignItems: 'center',
      backgroundColor: tint,
    },
    text: {
      fontSize: 16,
      color: buttonTextColor,
      fontWeight: 500,
    },
  })
}

export default ThemedButton
