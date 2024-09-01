import { Stack } from 'expo-router'
import { View } from 'react-native'
import NotificationIcon from '@/assets/icons/NotificationIcon'

export default function FavoritesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Favoritos',
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
