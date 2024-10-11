import { Stack } from 'expo-router'
import { StatusBar, View } from 'react-native'
import NotificationIcon from '@/assets/icons/NotificationIcon'

export default function SupportLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Soporte',
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
