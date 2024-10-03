import React from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece el fondo
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
  },
  loaderContainer: {
    backgroundColor: 'transparent',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loader
