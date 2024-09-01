import { ThemedText } from '@/components/ThemedText'
import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import SecondaryButton from '@/components/Home/SecondaryButton'
import ThemedInput from '@/components/ThemedInput'
import { useForm } from 'react-hook-form'
import ThemedButton from '@/components/ThemedButton'
import { provinces } from '@/constants/provinces'
import { useUpdateUser } from '@/state/api/userApi'
import Loader from '@/components/Loader'
import ChangePassModal from '@/components/myAccount/changePassWordModal/ChangePassModal'
import { useAuthService } from '@/state/services/authService'
import BottomSuccessDrawer from '@/components/BottomSuccessDrawer/BottomSuccessDrawer'
import { BuyerProfile } from '@/types'

const MyAccount = () => {
  const { t } = useTranslation()
  const { userData, loading } = useSelector((state: RootState) => state.auth)
  const [openModal, setOpenModal] = useState(false)
  const { updateUserData, isUpdating } = useUpdateUser()
  const { logoutUser } = useAuthService()
  const [showSuccessDrawer, setShowSuccessDrawer] = useState(false)
  const [showSuccessPassDrawer, setShowSuccessPassDrawer] = useState(false)

  const { control, handleSubmit } = useForm<BuyerProfile>({
    defaultValues: {
      name: userData.name,
      surname: userData.surname,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      city: userData.city,
      state: userData.state,
    },
  })

  if (loading || isUpdating) return <Loader />

  const onHandleChangePassword = () => {
    setOpenModal(true)
  }

  const onHandleSaveAccount = async (data: BuyerProfile) => {
    const result = await updateUserData({ id: userData.uid, ...data })
    if (result.data) setShowSuccessDrawer(true)
  }

  const onCloseSession = () => {
    logoutUser()
  }

  const handleCloseDrawer = () => {
    setShowSuccessDrawer(false)
  }

  const onCloseSucessPassDrawer = () => {
    setShowSuccessPassDrawer(false)
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <BottomSuccessDrawer
          isVisible={showSuccessDrawer}
          handleCloseDrawer={handleCloseDrawer}
          title={t('updatedProfile')}
        />
        <BottomSuccessDrawer
          isVisible={showSuccessPassDrawer}
          handleCloseDrawer={onCloseSucessPassDrawer}
          title={t('updatedPassword')}
        />
        <ChangePassModal
          visible={openModal}
          setOpenModal={setOpenModal}
          t={t}
          setShowSuccessPassDrawer={setShowSuccessPassDrawer}
        />
        <ThemedText type="title" style={{ marginBottom: 20 }}>
          {t('personalData').toLocaleUpperCase()}
        </ThemedText>
        <View style={{ gap: 16 }}>
          <View>
            <ThemedText type="title">{t('email')}</ThemedText>
            <ThemedText style={styles.email} type="title">
              {userData.userEmail}
            </ThemedText>
          </View>
          <View>
            <View style={styles.passwordContainer}>
              <ThemedText type="title">{t('password')}</ThemedText>
              <SecondaryButton
                underline
                title={t('changePassword')}
                onPress={onHandleChangePassword}
              />
            </View>
            <ThemedText style={{ fontWeight: 800 }}>************</ThemedText>
          </View>
          <ThemedInput
            name="name"
            label={t('name')}
            type="text"
            control={control}
          />
          <ThemedInput
            name="surname"
            label={t('surname')}
            type="text"
            control={control}
          />
          <ThemedInput
            name="phoneNumber"
            label={t('phone')}
            type="phone"
            control={control}
          />
          <View style={{ borderWidth: 0.2, borderColor: '#E3E3E3' }}></View>
          <ThemedText type="title">
            {t('address').toLocaleUpperCase()}
          </ThemedText>
          <ThemedInput
            name="address"
            label={t('street')}
            type="text"
            control={control}
          />
          <ThemedInput
            name="city"
            label={t('city')}
            type="text"
            control={control}
          />
          <ThemedInput
            name="state"
            label={t('province')}
            type="select"
            control={control}
            options={provinces}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ThemedButton
            title={t('save')}
            onPress={handleSubmit(onHandleSaveAccount)}
          />
          <ThemedButton title={t('closeSession')} onPress={onCloseSession} />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 23,
    paddingTop: 25,
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  email: {
    color: '#757575',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 50,
    gap: 10,
  },
})

export default MyAccount
