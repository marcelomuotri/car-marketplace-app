import React, { useRef, useEffect } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'

const FadeInView = ({ children, duration = 500 }) => {
  // Crear una referencia de opacidad inicial a 0
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Iniciar la animación de fade-in cuando el componente se monta
    Animated.timing(fadeAnim, {
      toValue: 1, // Cambia la opacidad a 1 (completamente visible)
      duration, // Duración del fade en milisegundos
      useNativeDriver: true, // Usar el driver nativo para optimización
    }).start()
  }, [fadeAnim, duration])

  return (
    <Animated.View // Estilo animado
      style={{
        ...styles.fadeView,
        opacity: fadeAnim, // Conectar la opacidad con la animación
      }}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  fadeView: {
    width: 250,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FadeInView
