import ThemedInput from '@/components/ThemedInput'
import { ThemedText } from '@/components/ThemedText'
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import ThemedButton from '@/components/ThemedButton'
import { useAddSupport } from '@/state/api/supportApi'
import Loader from '@/components/Loader'
import { SupportQueryUpload } from '@/types'
import BottomSuccessDrawer from '@/components/BottomSuccessDrawer/BottomSuccessDrawer'

const Support = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<any>({})
  const { addNewSupport, isLoading } = useAddSupport()
  const [showSuccessDrawer, setShowSuccessDrawer] = useState(false)
  const supportOptions = [
    { value: 'Publicaciones', label: t('publicationsProblem') },
    { value: 'Perfil', label: t('profileProblem') },
    { value: 'Cuenta', label: t('verificationProblem') },
    { value: 'Otros', label: t('others') },
  ]

  const onCreateSupportQuery = async (data: SupportQueryUpload) => {
    const result = await addNewSupport(data)
    if (result.data) {
      setShowSuccessDrawer(true)
    }
  }

  const onCloseSuccessDrawer = () => {
    setShowSuccessDrawer(false)
  }

  if (isLoading) return <Loader />
  return (
    <View style={styles.container}>
      <BottomSuccessDrawer
        handleCloseDrawer={onCloseSuccessDrawer}
        isVisible={showSuccessDrawer}
        title="La consulta se ha enviado correactamente"
        subTitle="Pronto alguien del equipo te va a responder via email"
      />
      <View style={styles.supportContainer}>
        <ThemedText type="title">Consultas</ThemedText>
        <ThemedText style={{ color: '#757575' }}>
          Utilizá este formulario para contactarte con nosotros por cualquier
          duda o inconveniente con la aplicación
        </ThemedText>
        <ThemedInput
          name="subject"
          control={control}
          label="holi"
          type="select"
          options={supportOptions}
          placeholder="Seleccionar"
        ></ThemedInput>
        <ThemedInput
          name="desctiption"
          type="text"
          numberOfLines={4}
          label="descripcion"
          control={control}
        />
        <ThemedButton
          title="Guardar"
          onPress={handleSubmit(onCreateSupportQuery)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  supportContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
})

export default Support
