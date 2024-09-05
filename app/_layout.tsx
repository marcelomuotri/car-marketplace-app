import React from 'react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import store from '../state/store'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { Provider } from 'react-redux'
import es from '../i18n/es.json'
import 'intl-pluralrules'
import { Stack } from 'expo-router/stack'
import { usePathname, useRouter } from 'expo-router'

SplashScreen.preventAutoHideAsync()

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
      },
    },
    es: {
      translation: es,
    },
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default function RootLayout() {
  const pathname = usePathname()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })
  // React.useEffect(() => {
  //   if (pathname === '/oauthredirect') {
  //     // Redirigir directamente a la ruta principal "/"
  //     router.replace('/')
  //   }
  // }, [pathname])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="productDetails"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="login-form" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up-form" options={{ headerShown: false }} />
          <Stack.Screen
            name="recover-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="oauthredirect" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  )
}
