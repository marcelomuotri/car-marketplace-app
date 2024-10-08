import { Redirect, Tabs, usePathname } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import HomeIcon from '@/assets/icons/HomeIcon'
import FavoriteIcon from '@/assets/icons/FavoriteIcon'
import { useThemeColor } from '@/hooks/useThemeColor'
import SupportIcon from '@/assets/icons/SupportIcon'
import AccountIcon from '@/assets/icons/AccountIcon'
import { Platform } from 'react-native'
import Loader from '@/components/Loader'
import { useEffect } from 'react'
import * as Linking from 'expo-linking'
import { router } from 'expo-router'
import useDeepLink from '@/state/services/useDeeplink'

export default function AppLayout() {
  const tabBarInactiveTintColor = useThemeColor({}, 'tabIconDefault')
  const tabBarActiveTintColor = useThemeColor({}, 'tabIconSelected')
  // Obtener el estado de autenticación
  const { user, loading } = useSelector((state: RootState) => state.auth)
  const { linkedURL, resetURL } = useDeepLink()
  const currentPath = usePathname() // Obtener la ruta actual

  useEffect(() => {
    if (linkedURL) {
      const parsedURL = Linking.parse(linkedURL) // Decodifica la URL

      // Verificar si la ruta del deep link es diferente de la ruta actual
      if (parsedURL?.path && parsedURL.path !== currentPath) {
        router.push(parsedURL.path)
      }

      // Reseteamos el estado de la URL una vez procesada
      resetURL() // Aquí es donde linkedURL se vuelve null
    }
  }, [linkedURL, resetURL, currentPath])

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login-form" />
  }

  if (loading) return <Loader />

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarActiveTintColor as string,
        tabBarInactiveTintColor: tabBarInactiveTintColor as string,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: 'white',
            height: 100,
            paddingBottom: 30,
            paddingTop: 12,
          },
          android: {
            backgroundColor: 'white',
            height: 80,
            paddingBottom: 12,
            paddingTop: 12,
          },
        }),
        tabBarLabelStyle: Platform.select({
          android: {
            marginBottom: 5,
          },
          ios: {
            marginBottom: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <FavoriteIcon color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Soporte',
          tabBarIcon: ({ color, focused }) => (
            <SupportIcon color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="myAccount"
        options={{
          title: 'Mi cuenta',
          tabBarIcon: ({ color, focused }) => (
            <AccountIcon color={color} filled={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
