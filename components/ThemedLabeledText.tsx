import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'

// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

interface ThemedLabeledTextProps {
  label: string
  value: string
}

const ThemedLabeledText = ({ label, value }: ThemedLabeledTextProps) => {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.label}>
        {capitalizeFirstLetter(label)}
      </ThemedText>
      <ThemedText>{capitalizeFirstLetter(value)}</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
})

export default ThemedLabeledText
