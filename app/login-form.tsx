import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  Image,
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
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import LoginButton from '@/components/Login/LoginButton'
import { ThemedText } from '@/components/ThemedText'

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
    iosClientId:
      '33038217968-n3sj03vqfmqacvatp7op14nvgej1em7p.apps.googleusercontent.com',
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

  const { loading, error } = useSelector((state: RootState) => state.auth)

  useAuthRedirect()

  const handleLogin: SubmitHandler<LoginFormFieldsProps> = async (data) => {
    try {
      const { email, password } = data
      await loginUser({ email, password })

      router.replace('/')
    } catch (error) {
      console.error('Login error:', error)
      Alert.alert(t('loginAlertTitle'), t('loginAlertMessage'))
    }
  }

  const signInWithGoogle = () => {
    promptAsync()
  }

  useEffect(() => {
    if (error) {
      Alert.alert(t('loginAlertTitle'), t('loginAlertMessage'))
    }
  }, [error])

  if (loading) return <Loader />
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={styles.image}
      />
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
          {error && (
            <Text style={{ marginBottom: 5, color: 'red' }}>
              {t('loginErrorMessage')}
            </Text>
          )}
          <LoginButton
            title={t('loginButton')}
            onPress={handleSubmit(handleLogin)}
          />
          <Link href={'/recover-password'} asChild>
            <ThemedText style={styles.forgotPassword} type="defaultSemiBold">
              {t('forgotPasswordLink')}
            </ThemedText>
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
            ></View>
            <View>
              <Text style={{ color: '#FFF', fontSize: 20, marginBottom: 5 }}>
                {t('or')}
              </Text>
            </View>
            <View
              style={{ flex: 1, height: 1.5, backgroundColor: '#FFF' }}
            ></View>
          </View>
          <LoginButton
            googleIcon
            title={t('googleLoginButton')}
            onPress={signInWithGoogle}
          />
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
    marginBottom: 15,
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
