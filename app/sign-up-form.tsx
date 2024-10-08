import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuthService } from '@/state/services/authService'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import ThemedTextInput from '../components/ThemedTextInput'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import Loader from '@/components/Loader'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import LoginButton from '@/components/Login/LoginButton'
import Back from '@/components/Back'
import { router } from 'expo-router'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { auth, db } from '@/firebaseConfig'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import {
  loginFailure,
  loginLoading,
  logoutSuccess,
} from '@/state/slices/authSlice'
import * as AppleAuthentication from 'expo-apple-authentication'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { createUserPayload } from '@/models/authModel'

interface SignUpFieldsForm {
  email: string
  password: string
  confirmPassword: string
}

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFieldsForm>()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { createUser, createUserFromGoogle } = useAuthService()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const [sendEmailScreen, setSendEmailScreen] = useState(false)
  const [isGoogleSignInInProgress, setGoogleSignInInProgress] = useState(false)

  useAuthRedirect()

  WebBrowser.maybeCompleteAuthSession()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  })

  useEffect(() => {
    const signInWithGoogle = async () => {
      try {
        const user = auth.currentUser

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

  const handleCreateAccount: SubmitHandler<SignUpFieldsForm> = async (data) => {
    const { email, password, confirmPassword } = data

    // Inicia el loading
    dispatch(loginLoading())

    if (password !== confirmPassword) {
      dispatch(loginFailure('Las contraseñas no coinciden'))
      return
    }

    try {
      const user = await createUser({ email, password })

      if (user) {
        setSendEmailScreen(true)
      } else {
        dispatch(loginFailure('Este email ya está en uso'))
      }
    } catch (error) {
      dispatch(loginFailure('Este email ya está en uso'))
    } finally {
      // Detiene el loading después de que se ha procesado el estado
      dispatch(logoutSuccess())
    }
  }

  const signInWithGoogle = () => {
    promptAsync()
  }

  const loginWithApple = async () => {
    try {
      // Iniciar el flujo de autenticación con Apple
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      // Guardar las credenciales de Apple en el estado
      //setAppleCredentialData(appleCredential)

      // Destructurar el token que vamos a pasar a Firebase
      const { identityToken } = appleCredential

      if (identityToken) {
        // Crear el proveedor de autenticación con Apple
        const provider = new OAuthProvider('apple.com')
        provider.addScope('email')
        provider.addScope('name')
        const credential = provider.credential({
          idToken: identityToken,
        })

        // Autenticar al usuario con Firebase usando el token de Apple
        const userCredential = await signInWithCredential(auth, credential)
        const user = userCredential.user
        // Guardar las credenciales de Firebase en el estado

        if (user) {
          const userUID = user.uid

          // Obtén una referencia al documento del usuario en Firestore
          const userDocRef = doc(db, 'users', userUID)

          // Verifica si el documento existe
          const userDoc = await getDoc(userDocRef)

          if (!userDoc.exists()) {
            // Si el documento no existe, es un usuario nuevo
            const userPayload = createUserPayload(user) // Ajusta esta función según tus necesidades

            // Crea un nuevo documento para el usuario en Firestore
            await setDoc(userDocRef, userPayload)
            console.log('Nuevo usuario creado en Firestore')
          } else {
            // Si el documento existe, el usuario ya está registrado
            console.log('Usuario existente, no se requiere acción adicional')
          }
        }
      }
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        Alert.alert('Autenticación cancelada')
      } else {
        Alert.alert(
          'Error',
          'Ocurrió un error durante la autenticación con Apple.',
        )
      }
    }
  }

  const handleBackHome = () => {
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Back />
          <Image
            source={require('../assets/images/logo.jpeg')}
            style={{
              width: 350,
              height: 150,
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 6,
            }}
          />
          {sendEmailScreen ? (
            <View>
              <ThemedText style={styles.title} type="defaultSemiBold">
                {t('verifyYourAccount')}
              </ThemedText>
              <ThemedText style={styles.text}>
                {t('weSentYouAVerificationEmail')}
              </ThemedText>
              <View style={styles.formAction}>
                <LoginButton
                  title={t('back')}
                  onPress={handleSubmit(handleBackHome)}
                />
              </View>
            </View>
          ) : (
            <>
              <ThemedText style={styles.title} type="defaultSemiBold">
                {t('registerAnAccount')}
              </ThemedText>
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
                      render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedTextInput
                          label="Email"
                          onChangeText={onChange}
                          value={value}
                          placeholder=""
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
                      render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedTextInput
                          label="Contraseña"
                          onChangeText={onChange}
                          value={value}
                          placeholder=""
                          secureTextEntry
                          error={errors.password}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.input}>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: true,
                        minLength: 6,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedTextInput
                          label="Repetir contraseña"
                          onChangeText={onChange}
                          value={value}
                          placeholder=""
                          secureTextEntry
                          error={errors.confirmPassword}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.formAction}>
                    <LoginButton
                      title={'Registrar cuenta'}
                      onPress={handleSubmit(handleCreateAccount)}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <View
                    style={{ flex: 1, height: 1.5, backgroundColor: '#FFF' }}
                  ></View>
                  <View>
                    <Text
                      style={{ color: '#FFF', fontSize: 20, marginBottom: 5 }}
                    >
                      {t('or')}
                    </Text>
                  </View>
                  <View
                    style={{ flex: 1, height: 1.5, backgroundColor: '#FFF' }}
                  ></View>
                </View>
                <LoginButton
                  googleIcon
                  title={t('registerWithGoogle')}
                  onPress={signInWithGoogle}
                />
                {Platform.OS === 'ios' && (
                  <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                      AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
                    }
                    buttonStyle={
                      AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                    }
                    style={{ width: '100%', height: 44, marginTop: 20 }}
                    onPress={loginWithApple}
                  />
                )}
              </KeyboardAwareScrollView>
            </>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flexGrow: 1,
    backgroundColor: '#3D9970',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    lineHeight: 20,
  },
  form: {
    flexGrow: 1,
  },
  formAction: {
    marginBottom: 0,
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
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
})
