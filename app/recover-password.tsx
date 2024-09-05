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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoverFormFieldsProps>()

  const { loading } = useSelector((state: RootState) => state.auth)
  const resetPassword = (data: { email: string }) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setShowConfirmation(true)
      })
      .catch(() => {
        // Manejar errores (como formatos de correo no válidos, problemas de red, etc.)
      })
  }

  const goToHome = () => {
    router.replace('/')
  }

  if (loading) return <Loader />
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
    paddingVertical: 24,
    paddingHorizontal: 20,
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
  input: {
    marginBottom: 8,
  },
})
