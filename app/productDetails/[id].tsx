import { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import React from 'react'
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native'
import { useGetProductById } from '@/state/api/productApi'
import { useLocalSearchParams } from 'expo-router'
import Carrousel from '@/components/ProductDetails/Carrousel'
import { useThemeColor } from '@/hooks/useThemeColor'
import { getCurrency } from '@/components/utils/getCurrency'
import { useGetUserById } from '@/state/api/userApi'
import Loader from '@/components/Loader'
import VendorInfo from '@/components/ProductDetails/VendorInfo'
import BottomDrawer from '@/components/BottomDrawer'

const { height, width } = Dimensions.get('window')

const Index = () => {
  const { id } = useLocalSearchParams()
  const { product, isLoading } = useGetProductById(id as string)
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
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <View style={styles.container}>
      <Carrousel productArray={productArray} />
      <View style={styles.descriptionContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title} type="title">
            {product?.title}
          </ThemedText>
          <ThemedText style={styles.price} type="title">
            {currency} {product?.price}
          </ThemedText>
        </View>
        <VendorInfo user={user} initials={initials} openDrawer={openDrawer} />
      </View>

      {/* Overlay con TouchableOpacity para cerrar el Drawer */}
      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeDrawer}
          activeOpacity={1}
        >
          <View style={styles.drawerContainer}>
            <BottomDrawer isVisible={isDrawerOpen} handleClose={closeDrawer}>
              <Text>Hola , soy el modal</Text>
            </BottomDrawer>
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
    },
    titleContainer: {
      marginVertical: 9,
    },
    title: {
      fontSize: 16,
    },
    price: {
      fontSize: 18,
    },
  })
}

export default Index
