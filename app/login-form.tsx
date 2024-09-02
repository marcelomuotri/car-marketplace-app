import React, { useEffect } from 'react'
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
//import { signIn } from "../firebase/api/auth_sign_in";
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

interface LoginFormFieldsProps {
  email: string | undefined
  password: string | undefined
}

export default function LoginForm() {
  const { t } = useTranslation()
  const { loginUser } = useAuthService()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormFieldsProps>()

  const { loading, error } = useSelector((state: RootState) => state.auth)

  useAuthRedirect()

  const handleLogin: SubmitHandler<LoginFormFieldsProps> = async (data) => {
    const { email, password } = data
    loginUser({ email, password })
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Login', 'Nombre de usuario o contraseña incorrectos')
    }
  }, [error])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  if (loading) return <Loader />
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>2y4Race</Text>
        <Image
          source={require('../assets/images/coche2.jpg')}
          style={{
            marginTop: 20,
            width: 350,
            height: 150,
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 6,
          }}
        />
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
                    placeholder="email"
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
                onPress={handleSubmit(handleLogin)}
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
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },

  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },

  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
})
