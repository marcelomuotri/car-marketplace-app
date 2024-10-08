import { ThemedText } from '@/components/ThemedText'
import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { Platform } from 'react-native'
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
import ExitIcon from '@/assets/icons/ExitIcon'
import ArrowRight from '@/assets/icons/ArrowRight'
import ConfirmationModal from '@/components/ConfirmationModal'
import { Tooltip } from '@rneui/base'
import Animated, { FadeIn } from 'react-native-reanimated'

const MyAccount = () => {
  const { t } = useTranslation()
  const { userData, loading } = useSelector((state: RootState) => state.auth)
  const [openModal, setOpenModal] = useState(false)
  const { updateUserData, isUpdating } = useUpdateUser()
  const {
    logoutUser,
    deleteUser,
    getAuthProvider,
    handleGoogleDelete,
    handlePasswordDelete,
  } = useAuthService()
  const [showSuccessDrawer, setShowSuccessDrawer] = useState(false)
  const [showSuccessPassDrawer, setShowSuccessPassDrawer] = useState(false)
  const [showDeleteConfimationModal, setShowDeleteConfimationModal] =
    useState(false)

  const provider = getAuthProvider()

  const { control, handleSubmit } = useForm<BuyerProfile>({
    defaultValues: {
      name: userData?.name || '',
      surname: userData?.surname || '',
      phoneNumber: userData?.phoneNumber || '',
      address: userData?.address || '',
      city: userData?.city || '',
      state: userData?.state || '',
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

  const onConfirmDeletion = () => {
    deleteUser()
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View entering={FadeIn.duration(1000)}>
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
        <ConfirmationModal
          visible={showDeleteConfimationModal}
          onClose={() => setShowDeleteConfimationModal(false)}
          title={t('deleteAccountConfirmation')}
          onConfirm={onConfirmDeletion}
          provider={provider}
          onConfirmGoogle={handleGoogleDelete}
          onConfirmPassword={handlePasswordDelete}
        />
        {/* <TouchableOpacity
          style={styles.bannerContainer}
          onPress={() => Linking.openURL('https://app.2y4race.com')}
        >
          <ThemedText style={styles.bannerText}>
            Publicá gratis tus productos
          </ThemedText>
          <ArrowRight />
        </TouchableOpacity> */}

        <ThemedText type="title" style={{ marginBottom: 20 }}>
          {t('personalData').toLocaleUpperCase()}
        </ThemedText>
        <View style={{ gap: 16 }}>
          <View>
            <ThemedText type="title">{t('email')}</ThemedText>
            <ThemedText style={styles.email} type="title">
              {userData?.userEmail}
            </ThemedText>
          </View>
          <View>
            <View style={styles.passwordContainer}>
              <ThemedText type="title">{t('password')}</ThemedText>
              <SecondaryButton
                underline
                title={t('changePassword')}
                onPress={onHandleChangePassword}
                style={{ padding: 0 }}
              />
            </View>
            <ThemedText style={{ fontWeight: 800, marginBottom: 8 }}>
              ************
            </ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExitIcon />
              <SecondaryButton
                underline
                title={t('closeSession')}
                onPress={onCloseSession}
                style={{ padding: 5, alignItems: 'flex-start' }}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: Platform.select({
                android: 0.3,
                ios: 0.5,
              }),
              borderColor: '#E3E3E3',
              marginBottom: 20,
            }}
          ></View>
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
          <View style={{ marginBottom: 13 }}></View>
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
          <SecondaryButton
            title={t('deleteMyAccount')}
            onPress={() => setShowDeleteConfimationModal(true)}
            underline
          />
        </View>
      </Animated.View>
    </ScrollView>
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
  bannerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#67C4A7',
    backgroundColor: 'rgba(103, 196, 167, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center', // Centra verticalmente
  },
  bannerText: {
    color: '#393F42',
  },
})

export default MyAccount
