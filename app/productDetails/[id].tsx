import { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native'
import {
  useGetProductById,
  useIncrementProductField,
} from '@/state/api/productApi'
import { useLocalSearchParams } from 'expo-router'
import Carrousel from '@/components/ProductDetails/Carrousel'
import { useThemeColor } from '@/hooks/useThemeColor'
import { getCurrency } from '@/components/utils/getCurrency'
import { useGetUserById } from '@/state/api/userApi'
import Loader from '@/components/Loader'
import VendorInfo from '@/components/ProductDetails/VendorInfo'
import BottomDrawer from '@/components/BottomDrawer'
import ThemedButton from '@/components/ThemedButton'
import ThemedLabeledText from '@/components/ThemedLabeledText'
import SecondaryButton from '@/components/Home/SecondaryButton'
import { useTranslation } from 'react-i18next'
import { getFieldsToShow } from '@/components/Home/utils/fieldUtils'
import ShareIcon from '@/assets/icons/ShareIcon'
import HeartIcon from '@/assets/icons/HeatIcon'
import BottomSheetDrawer from '@/components/BottomSheetDrawer'

const { height, width } = Dimensions.get('window')

const Index = () => {
  const { t } = useTranslation()
  const { id } = useLocalSearchParams()
  const { product, isLoading } = useGetProductById(id as string)
  const { incrementField } = useIncrementProductField()
  const { user, isLoadingUser } = useGetUserById(product?.uid || '')
  const backgroundColor = useThemeColor({}, 'background')
  const currency = getCurrency(product?.currency)
  const [initials, setInitials] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    if (user?.name) {
      const firstLetterOfName = user?.name.charAt(0).toUpperCase()
      const firstLetterOfLastName = user.surname?.charAt(0).toUpperCase()

      setInitials(`${firstLetterOfName}${firstLetterOfLastName}`)
    }
  }, [user, initials])

  if (isLoadingUser || isLoading) {
    return <Loader />
  }

  const styles = createStyles(backgroundColor as string)

  const productArray = product
    ? [product?.photo1Url, product?.photo2Url, product?.photo3Url].filter(
        Boolean,
      )
    : []

  const openDrawer = () => {
    incrementField(product?.id, 'contacts')
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const shareToWhatsApp = () => {
    const productUrl = `exp://`
    const message = `${product?.title}\n\nEcha un vistazo a esta publicación en ${productUrl}`
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`

    Linking.openURL(whatsappUrl).catch(() => {
      alert('Asegúrate de que WhatsApp esté instalado en tu dispositivo')
    })
  }

  const fieldsToShow = getFieldsToShow(product, t)

  return (
    <View style={styles.container}>
      <Carrousel productArray={productArray} />
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titlePlusIconContainer}>
            <ThemedText style={styles.title} type="title">
              {product?.title}
            </ThemedText>
            <View>
              <View style={styles.shareIconContainer}>
                <TouchableOpacity onPress={shareToWhatsApp}>
                  <ShareIcon />
                </TouchableOpacity>
                <HeartIcon />
              </View>
            </View>
          </View>
          <ThemedText style={styles.price} type="title">
            {currency} {product?.price}
          </ThemedText>
        </View>
        <VendorInfo
          user={user}
          initials={initials}
          openDrawer={openDrawer}
          showProfileButton
          showBorder={true}
        />
        <ScrollView
          style={styles.productDescription}
          contentContainerStyle={{ paddingBottom: 20, gap: 16 }}
        >
          {fieldsToShow.map((field) => (
            <ThemedLabeledText
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <ThemedButton title={t('seeContact')} onPress={openDrawer} />
      </View>
      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeDrawer}
          activeOpacity={1}
        >
          <View style={styles.drawerContainer}>
            <BottomSheetDrawer
              isVisible={isDrawerOpen}
              handleClose={closeDrawer}
              header={t('contactData')}
              height={0.5}
            >
              <VendorInfo user={user} initials={initials} />
              <View style={styles.vendorInfoContainer}>
                <View style={styles.labeledTextContainer}>
                  <ThemedLabeledText
                    label={t('phone')}
                    value={user.phoneNumber}
                  />
                  <ThemedLabeledText
                    label={t('email')}
                    value={user.contactEmail}
                  />
                </View>
                <SecondaryButton title={t('seeSellerProfile')} />
              </View>
            </BottomSheetDrawer>
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

const createStyles = (backgroundColor: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
      justifyContent: 'space-between',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    drawerContainer: {
      width: width,
    },
    descriptionContainer: {
      marginHorizontal: 20,
      flex: 1,
    },
    titleContainer: {
      marginVertical: 9,
    },
    titlePlusIconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    shareIconContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    title: {
      fontSize: 16,
    },
    price: {
      fontSize: 18,
    },
    productDescription: {
      flex: 1,
    },
    labeledTextContainer: {
      gap: 16,
    },
    buttonContainer: {
      height: 100,
      borderTopWidth: 1,
      borderTopColor: '#F0F2F1',
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    vendorInfoContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
  })
}

export default Index
