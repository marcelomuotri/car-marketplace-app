import { Stack } from 'expo-router'
import NotificationIcon from '@/assets/icons/NotificationIcon'
import { View } from 'react-native'

export default function ProductLayout() {
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
