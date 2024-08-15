import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'

interface ThemedLabeledTextProps {
  label: string
  value: string | number
}

const ThemedLabeledText = ({ label, value }: ThemedLabeledTextProps) => {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText>{value}</ThemedText>
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
