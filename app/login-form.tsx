import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  Image,
  Platform,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Link, router } from 'expo-router'
import { RootState } from '@/state/store'
import { useSelector } from 'react-redux'
import { useAuthService } from '@/state/services/authService'
import { useTranslation } from 'react-i18next'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import ThemedTextInput from '../components/ThemedTextInput'
import Loader from '@/components/Loader'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
  GoogleAuthProvider,
  signInWithCredential,
  sendEmailVerification,
  OAuthProvider,
} from 'firebase/auth'
import { auth, db } from '@/firebaseConfig'
import LoginButton from '@/components/Login/LoginButton'
import { ThemedText } from '@/components/ThemedText'
import { loginLoading, loginStopLoading } from '@/state/slices/authSlice'
import { useDispatch } from 'react-redux'
import * as AppleAuthentication from 'expo-apple-authentication'
import { createUserPayload } from '@/models/authModel'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface LoginFormFieldsProps {
  email: string | undefined
  password: string | undefined
}

export default function LoginForm() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isGoogleSignInInProgress, setGoogleSignInInProgress] = useState(false)
  const { loginUser, createUserFromGoogle, saveUserToFirestore } =
    useAuthService()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormFieldsProps>()

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
            //no esta creando en usuario en la tabla users
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
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [persistUser, setpersistUser] = useState<any>()
  const [appleError, setAppleError] = useState('')

  useAuthRedirect()

  const handleLogin: SubmitHandler<LoginFormFieldsProps> = async (data) => {
    const { email, password } = data
    dispatch(loginLoading()) // Iniciamos la carga

    const user = await loginUser({ email, password })

    if (!user) {
      // Si no hay usuario, no debemos cambiar loading hasta que el error esté procesado
      return
    }

    setpersistUser(user)
    dispatch(loginStopLoading()) // Detenemos la carga al final del flujo de autenticación
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

  const onResendVerificatioEmail = () => {
    sendEmailVerification(persistUser)
    setShowEmailVerification(false)
  }

  const navigateToLogin = () => {
    setShowEmailVerification(false)
  }

  useEffect(() => {
    if (error === 'incorrectPassword') {
      Alert.alert(t('loginAlertTitle'), t('loginAlertMessage'))
    } else if (error === 'notVerified') {
      setShowEmailVerification(true)
      //Alert.alert(t('loginAlertTitle'), t('loginAlertMessage'))
    }
    //dispatch(logoutSuccess())
  }, [error, dispatch, t])

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Contenedor para evitar el error */}
          <Image
            source={require('../assets/images/logo.jpeg')}
            style={styles.image}
          />

          {showEmailVerification ? (
            <View>
              <ThemedText style={styles.title} type="defaultSemiBold">
                {t('verifyYourEmailToContinue')}
              </ThemedText>
              <ThemedText style={styles.text}>
                {t('weSentYouAVerificationEmail')}
              </ThemedText>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <ThemedText style={styles.text}>
                  Si no te llegó el email,{' '}
                </ThemedText>
                <ThemedText
                  style={[styles.text, { textDecorationLine: 'underline' }]}
                  onPress={onResendVerificatioEmail}
                >
                  hacé click acá
                </ThemedText>
                <ThemedText style={styles.text}> y te lo</ThemedText>
              </View>
              <ThemedText style={styles.text}>volvemos a enviar</ThemedText>
              <View style={{ marginTop: 20 }}>
                <LoginButton title={t('back')} onPress={navigateToLogin} />
              </View>
            </View>
          ) : (
            <View>
              <ThemedText style={styles.title} type="defaultSemiBold">
                {t('loginTitle')}
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
                          message: t('invalidEmail'),
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <ThemedTextInput
                          label={t('emailLabel')}
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
                      render={({ field: { onChange, value } }) => (
                        <ThemedTextInput
                          label={t('passwordLabel')}
                          onChangeText={onChange}
                          value={value}
                          placeholder=""
                          secureTextEntry
                          error={errors.password}
                        />
                      )}
                    />
                  </View>
                  <LoginButton
                    title={t('loginButton')}
                    onPress={handleSubmit(handleLogin)}
                  />
                  <Link href={'/recover-password'} asChild>
                    <Text style={styles.forgotPassword}>
                      {t('forgotPasswordLink')}
                    </Text>
                  </Link>
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
                    />
                    <View>
                      <Text
                        style={{ color: '#FFF', fontSize: 20, marginBottom: 5 }}
                      >
                        {t('or')}
                      </Text>
                    </View>
                    <View
                      style={{ flex: 1, height: 1.5, backgroundColor: '#FFF' }}
                    />
                  </View>
                  <LoginButton
                    googleIcon
                    title={t('googleLoginButton')}
                    onPress={signInWithGoogle}
                  />
                  {Platform.OS === 'ios' && (
                    <AppleAuthentication.AppleAuthenticationButton
                      buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                          .CONTINUE
                      }
                      buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                      }
                      style={{ width: '100%', height: 44, marginTop: 20 }}
                      onPress={loginWithApple}
                    />
                  )}
                  <ThemedText style={styles.formFooter} type="defaultSemiBold">
                    {t('noAccount')}{' '}
                    <Link href={'/sign-up-form'} asChild>
                      <Text style={{ textDecorationLine: 'underline' }}>
                        {t('signUpLink')}
                      </Text>
                    </Link>
                  </ThemedText>
                </View>
              </KeyboardAwareScrollView>
            </View>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    backgroundColor: '#3D9970',
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
    lineHeight: 20,
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
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
    gap: 15,
  },
  formFooter: {
    marginTop: 40,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.15,
    color: '#FFF',
  },
  input: {
    marginBottom: 8,
  },
  forgotPassword: {
    marginVertical: 15,
    color: '#FFF',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
})
function stopLoading(): any {
  throw new Error('Function not implemented.')
}
