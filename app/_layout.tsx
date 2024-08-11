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
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })

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
        </Stack>
      </ThemeProvider>
    </Provider>
  )
}
