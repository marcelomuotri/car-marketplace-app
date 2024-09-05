import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { ThemedText } from '../ThemedText'
import GoogleIcon from '@/assets/icons/GoogleIcon'

interface LoginButtonProps {
  onPress: () => void
  title: string
  googleIcon?: boolean
}

const LoginButton = ({
  onPress,
  title,
  googleIcon = false,
}: LoginButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {googleIcon && <GoogleIcon />}
      <ThemedText style={styles.text} type="defaultSemiBold">
        {title}
      </ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    color: 'red',
    backgroundColor: '#FFF',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#393F42',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 14,
  },
})

export default LoginButton
