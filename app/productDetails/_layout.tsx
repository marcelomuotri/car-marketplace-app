import React, { useState, useEffect } from 'react'
import { router, Stack } from 'expo-router'
import NotificationIcon from '@/assets/icons/NotificationIcon'
import { View } from 'react-native'
import BackButton from '@/components/Back'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

export default function ProductLayout() {
  const { user } = useSelector((state: RootState) => state.auth)

  // Si no hay `userData`, redirige al inicio
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Marcar como montado para asegurarnos de que la navegación está lista
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !user) {
      router.replace('/')
    }
  }, [user, isMounted])

  // Evitar renderizar mientras el layout no está montado o si se está redirigiendo
  if (!isMounted || !user) {
    return null
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff', // Fondo blanco
        },
        headerTintColor: '#000', // Color del texto y de los iconos
        headerTitleAlign: 'center', // Centra el título
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle',
          headerLeft: () => (
            <View style={{ marginRight: 10 }}>
              <BackButton color="black" />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <NotificationIcon />
            </View>
          ),
        }}
      />
    </Stack>
  )
}
