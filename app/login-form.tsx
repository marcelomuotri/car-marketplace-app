import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router } from 'expo-router'
import { RootState } from '@/state/store'
import { useSelector } from 'react-redux'
import { useAuthService } from '@/state/services/authService'
import { useTranslation } from 'react-i18next'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import ThemedTextInput from '../components/ThemedTextInput'
import Loader from '@/components/Loader'
import ThemedButton from '@/components/ThemedButton'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import * as Linking from 'expo-linking'
import Logo from '@/assets/icons/Logo'

interface LoginFormFieldsProps {
  email: string | undefined
  password: string | undefined
}

export default function LoginForm() {
  const { t } = useTranslation()
  const [isGoogleSignInInProgress, setGoogleSignInInProgress] = useState(false)
  const { loginUser, createUserFromGoogle } = useAuthService()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormFieldsProps>()

  WebBrowser.maybeCompleteAuthSession()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '33038217968-n3sj03vqfmqacvatp7op14nvgej1em7p.apps.googleusercontent.com',
  })

  useEffect(() => {
    const signInWithGoogle = async () => {
      try {
        const user = auth.currentUser // Verifica si ya hay un usuario autenticado

        // Solo procesar la autenticación de Google si no hay usuario autenticado y la respuesta es exitosa
        if (
          !user &&
          response?.type === 'success' &&
          response.params?.id_token
        ) {
          const { id_token } = response.params
          const credential = GoogleAuthProvider.credential(id_token)

          const userCredential: any = await signInWithCredential(
            auth,
            credential,
          )
          if (userCredential) {
            await createUserFromGoogle(userCredential)
          }
        }
      } catch (error) {
        console.error('Error durante la autenticación:', error)
      } finally {
        setGoogleSignInInProgress(false)
      }
    }

    if (response?.type === 'success' && !isGoogleSignInInProgress) {
      setGoogleSignInInProgress(true)
      signInWithGoogle()
    }
  }, [response])

  const { loading, error } = useSelector((state: RootState) => state.auth)

  useAuthRedirect()

  const handleLogin: SubmitHandler<LoginFormFieldsProps> = async (data) => {
    try {
      const { email, password } = data
      await loginUser({ email, password })

      // Redirigir a la página principal después del inicio de sesión exitoso
      router.push('/home') // Cambia '/home' por la ruta que quieras
    } catch (error) {
      console.error('Login error:', error)
      Alert.alert('Login', 'Nombre de usuario o contraseña incorrectos')
    }
  }

  const signInWithGoogle = () => {
    promptAsync()
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Login', 'Nombre de usuario o contraseña incorrectos')
    }
  }, [error])

  if (loading) return <Loader />
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.jpeg')}
          style={styles.image}
        />
        <Text style={styles.title}>Inicia Sesión o Registrate</Text>
        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'invalid email address',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    label="Email"
                    onChangeText={onChange}
                    value={value}
                    placeholder="ejemplo@ejemplo.com"
                    error={errors.email}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field: { onChange, value } }) => (
                  <ThemedTextInput
                    label="Contraseña"
                    onChangeText={onChange}
                    value={value}
                    placeholder="password"
                    secureTextEntry
                    error={errors.password}
                  />
                )}
              />
            </View>
            <View style={styles.formAction}>
              <ThemedButton title="Login" onPress={handleSubmit(handleLogin)} />
              <ThemedButton
                title="Login con Google"
                onPress={signInWithGoogle}
              />
              {error && <Text>Nombre de usuario o contraseña incorrectos</Text>}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => {
            router.push('/sign-up-form')
          }}
          style={{ marginTop: 'auto' }}
        >
          <Text style={styles.formFooter}>
            ¿Ya tienes una cuenta?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>
              Iniciar sesión
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    backgroundColor: '#3D9970',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  image: {
    marginTop: 20,
    width: 350,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
    gap: 15,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 8,
  },
})
