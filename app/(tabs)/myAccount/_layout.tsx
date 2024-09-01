import { Stack } from 'expo-router'
import { View } from 'react-native'
import NotificationIcon from '@/assets/icons/NotificationIcon'

export default function MyAccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Mi cuenta',
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
