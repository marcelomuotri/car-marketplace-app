import React from 'react'
import ThemedModal from './ThemedModal'
import { ThemedText } from './ThemedText'
import ThemedButton from './ThemedButton'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import ThemedTextInput from './ThemedTextInput'
import ThemedInput from './ThemedInput'
import { useForm } from 'react-hook-form'

interface ConfirmationModalProps {
  visible: boolean
  onClose: () => void
  title: string
  onConfirm: () => void
  provider: string | null
  onConfirmGoogle: any
  onConfirmPassword: any
}

const ConfirmationModal = ({
  visible,
  onClose,
  title,
  onConfirm,
  provider,
  onConfirmGoogle,
  onConfirmPassword,
}: ConfirmationModalProps) => {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {},
  })
  const { t } = useTranslation()

  // Function to call the appropriate confirm action based on provider
  const handleConfirm = () => {
    if (provider === 'google') {
      onConfirmGoogle()
    } else if (provider === 'password') {
      handleSubmit(onConfirmPassword)()
    }
  }
  return (
    <ThemedModal visible={visible} onClose={onClose}>
      <ThemedText style={{ fontSize: 18 }} type="defaultSemiBold">
        {provider === 'google'
          ? '¿Estás seguro que querés borrar tu cuenta?'
          : 'Confirmá tu contraseña para continuar'}
      </ThemedText>
      {provider === 'password' && (
        <ThemedInput type="password" control={control} name="password" />
      )}
      <View
        style={{
          paddingTop: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <ThemedButton
          title={'Cancelar'}
          style={{ paddingHorizontal: 15 }}
          onPress={onClose}
        />
        <ThemedButton
          title={t('deleteMyAccount')}
          style={{
            paddingHorizontal: 15,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#3D9970',
          }}
          textStyle={{ color: '#393F42' }}
          onPress={handleConfirm}
        />
      </View>
    </ThemedModal>
  )
}

export default ConfirmationModal
