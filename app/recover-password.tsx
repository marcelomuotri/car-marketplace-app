import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { router } from 'expo-router'
import { RootState } from '@/state/store'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import ThemedTextInput from '../components/ThemedTextInput'
import Loader from '@/components/Loader'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import LoginButton from '@/components/Login/LoginButton'
import { ThemedText } from '@/components/ThemedText'
import Back from '@/components/Back'

interface RecoverFormFieldsProps {
  email: string | undefined
}

export default function RecoverPassword() {
  const { t } = useTranslation()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [localLoading, setLocalLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoverFormFieldsProps>()

  const { loading } = useSelector((state: RootState) => state.auth)

  const resetPassword = async (data: { email: string }) => {
    setLocalLoading(true) // Mostrar el Loader
    try {
      await sendPasswordResetEmail(auth, data.email)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Error sending password reset email:', error)
      // Manejar errores (como formatos de correo no válidos, problemas de red, etc.)
    } finally {
      setLocalLoading(false) // Ocultar el Loader
    }
  }

  const goToHome = () => {
    router.replace('/')
  }

  // Si loading o localLoading es true, mostrar el Loader
  if (loading || localLoading)
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    )

  return (
    <View style={styles.container}>
      <Back />
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={styles.image}
      />
      {showConfirmation ? (
        <>
          <ThemedText style={styles.title} type="defaultSemiBold">
            {t('confirmationTitle')}
          </ThemedText>
          <ThemedText style={styles.text}>{t('confirmationText')}</ThemedText>
          <ThemedText style={styles.textBold} type="defaultSemiBold">
            {t('noEmail')}
          </ThemedText>
          <ThemedText style={styles.text}>{t('instructions')}</ThemedText>
          <LoginButton title={t('goHome')} onPress={goToHome} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{t('title')}</Text>
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
            <LoginButton
              title={t('resetPassword')}
              onPress={handleSubmit(resetPassword)}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    flexGrow: 1,
    backgroundColor: '#3D9970',
  },
  title: {
    fontSize: 26,
    color: '#FFF',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    lineHeight: 20,
  },
  textBold: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  image: {
    width: 350,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
})
