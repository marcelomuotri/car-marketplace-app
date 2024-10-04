import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import ThemedInput from '@/components/ThemedInput'
import ThemedButton from '@/components/ThemedButton'
import BottomSuccessDrawer from '@/components/BottomSuccessDrawer/BottomSuccessDrawer'
import Loader from '@/components/Loader'
import { useAddSupport } from '@/state/api/supportApi'
import { SupportQueryUpload } from '@/types'
import { ThemedText } from '@/components/ThemedText'

const Support = () => {
  const { t } = useTranslation()
  const { control, handleSubmit, reset } = useForm<any>({})
  const { addNewSupport, isLoading } = useAddSupport()
  const [showSuccessDrawer, setShowSuccessDrawer] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  const supportOptions = [
    { value: t('loginProblem'), label: t('loginProblem') },
    { value: t('profileProblem'), label: t('profileProblem') },
    { value: t('deleteAccount'), label: t('deleteAccount') },
    { value: t('others'), label: t('others') },
  ]

  const onCreateSupportQuery = async (data: SupportQueryUpload) => {
    const result = await addNewSupport(data)
    if (result.data) {
      setShowSuccessDrawer(true)
      setSuccess(true)
      reset({ subject: '', description: '' })
    }
  }

  const onCloseSuccessDrawer = () => {
    setShowSuccessDrawer(false)
  }

  const BottomSucessDrawerProps = {
    title: success
      ? 'La consulta se ha enviado correctamente'
      : 'En este momento, no podemos procesar tu consulta',
    subTitle: success
      ? 'Pronto alguien del equipo te va a responder vía email'
      : 'Por favor intenta más tarde.',
    type: success ? 'success' : 'error',
  }

  if (isLoading) return <Loader />

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <BottomSuccessDrawer
        handleCloseDrawer={onCloseSuccessDrawer}
        isVisible={showSuccessDrawer}
        {...BottomSucessDrawerProps}
      />
      <View style={styles.supportContainer}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <ThemedText type="title">Consultas</ThemedText>
            <ThemedText style={{ color: '#757575' }}>
              Utilizá este formulario para contactarte con nosotros por
              cualquier duda o inconveniente con la aplicación
            </ThemedText>
          </View>
          <ThemedInput
            name="subject"
            control={control}
            label="Motivo de la consulta"
            type="select"
            options={supportOptions}
            placeholder="Seleccionar"
          />
          <ThemedInput
            name="description"
            type="text"
            numberOfLines={4}
            label="Descripción"
            control={control}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ThemedButton
            title="Enviar consulta"
            onPress={handleSubmit(onCreateSupportQuery)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  supportContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
})

export default Support
