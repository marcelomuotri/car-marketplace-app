import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuthService } from '@/state/services/authService'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import ThemedTextInput from '../components/ThemedTextInput'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import Loader from '@/components/Loader'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import LoginButton from '@/components/Login/LoginButton'
import Back from '@/components/Back'
import { router } from 'expo-router'

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
  const { createUser } = useAuthService()
  const { loading } = useSelector((state: RootState) => state.auth)
  const [sendEmailScreen, setSendEmailScreen] = useState(false)

  useAuthRedirect()

  const handleCreateAccount: SubmitHandler<SignUpFieldsForm> = async (data) => {
    const { email, password, confirmPassword } = data
    if (password !== confirmPassword) {
      return alert('Las contraseñas no coinciden')
    }
    createUser({ email, password })
    setSendEmailScreen(true)
  }

  const handleBackHome = () => {
    router.replace('/')
  }
  if (loading) {
    return <Loader />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Back />
        <Image
          source={require('../assets/images/logo.jpeg')}
          style={{
            marginTop: 10,
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
            </KeyboardAwareScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    backgroundColor: '#3D9970',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
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
    marginBottom: 16,
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
