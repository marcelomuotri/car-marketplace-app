import ThemedModal from '@/components/ThemedModal'
import { Text, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ThemedInput from '@/components/ThemedInput'
import ThemedButton from '@/components/ThemedButton'
import { useAuthService } from '@/state/services/authService'
import { ThemedText } from '@/components/ThemedText'
import { TFunction } from 'i18next'

interface ChangePassModalProps {
  visible: boolean
  setOpenModal: (value: boolean) => void
  t: TFunction
  setShowSuccessPassDrawer: (value: boolean) => void
}

interface ChangePasswordFields {
  password: string
  newPassword: string
  repeatPassword: string
}

const ChangePassModal = ({
  visible,
  setOpenModal,
  t,
  setShowSuccessPassDrawer,
}: ChangePassModalProps) => {
  const { changePassword } = useAuthService()
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)

  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: {},
  })

  const onHandleChangePassword = async (data: ChangePasswordFields) => {
    const { newPassword, password, repeatPassword } = data

    if (!newPassword || !password || !repeatPassword) {
      setPasswordError(t('completeAllFields'))
      return
    }

    if (newPassword !== repeatPassword) {
      setPasswordError(t('passwordNotMatch'))
      return
    }

    if (!newPassword || newPassword?.length < 6) {
      setPasswordError(t('password6Caracters'))
      return
    }

    setPasswordError(null) // Resetea el error de contraseña
    setAuthError(null) // Resetea el error de autenticación

    try {
      const response = await changePassword(password, newPassword)
      if (response.status === 'ok') {
        //esto no salta porque estoy cerrando el modal , tengo que llamarlo desde index
        setShowSuccessPassDrawer(true)
        onCloseModal()
      } else {
        setAuthError(t('incorrectPassword')) // Puedes ajustar el mensaje según el error específico
      }
    } catch (error) {
      setAuthError(t('incorrectPassword'))
      console.error(error)
    }
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setAuthError(null)
    setPasswordError(null)
    reset()
  }

  return (
    <ThemedModal visible={visible} onClose={onCloseModal}>
      <View style={{ gap: 20 }}>
        <Text>{t('changePassword')}</Text>
        <ThemedInput
          name="password"
          type="password"
          control={control}
          label={t('currentPassword')}
        />
        <ThemedInput
          name="newPassword"
          type="password"
          control={control}
          label={t('newPassword')}
        />
        <ThemedInput
          name="repeatPassword"
          type="password"
          control={control}
          label={t('repeatNewPassword')}
        />
        {passwordError && (
          <ThemedText style={styles.errorText}>{passwordError}</ThemedText>
        )}
        {authError && (
          <ThemedText style={styles.errorText}>{authError}</ThemedText>
        )}
        <ThemedButton
          title={t('changePassword')}
          onPress={handleSubmit(onHandleChangePassword)}
        />
      </View>
    </ThemedModal>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
})

export default ChangePassModal
