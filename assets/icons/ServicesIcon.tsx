import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const ServicesIcon = ({ width = 30, height = 25 }) => {
  return (
    <View style={[styles.iconContainer, { width, height }]}>
      <Image
        source={{
          uri: 'data:image/png;base64,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',
        }}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})

export default ServicesIcon
