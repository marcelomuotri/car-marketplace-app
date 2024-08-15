import React from 'react'
import { ThemedText } from '../ThemedText'
import { View, Image, StyleSheet } from 'react-native'
import SecondaryButton from '../Home/SecondaryButton'
import { useTranslation } from 'react-i18next'
import { UserData } from '@/types'

interface VendorInfoProps {
  user: UserData
  initials: string
  openDrawer?: () => void
  showProfileButton?: boolean
  showBorder?: boolean
}

const VendorInfo = ({
  user,
  initials,
  openDrawer,
  showProfileButton,
  showBorder = false,
}: VendorInfoProps) => {
  const { t } = useTranslation()
  const styles = createStyles(showBorder)

  const renderAvatar = () => {
    if (user?.photoToShowUrl) {
      return (
        <Image
          source={{ uri: user.photoToShowUrl }}
          style={styles.photoToShow}
        />
      )
    } else {
      return (
        <View style={styles.avatarPlaceholder}>
          <ThemedText style={styles.avatarText}>{initials}</ThemedText>
        </View>
      )
    }
  }
  return (
    <>
      <View style={styles.vendorInfo}>
        <View style={styles.vendorZone}>
          {renderAvatar()}
          <View>
            <ThemedText type="title" style={styles.title}>
              {user?.nameToShow}
            </ThemedText>
            <ThemedText type="categoryIcon" style={styles.zone}>
              {user?.city}, {user?.state}
            </ThemedText>
          </View>
        </View>

        {showProfileButton && (
          <SecondaryButton title={t('seeProfile')} onPress={openDrawer} />
        )}
      </View>
    </>
  )
}

const createStyles = (showBorder: boolean) => {
  return StyleSheet.create({
    title: {
      fontSize: 16,
    },
    vendorInfo: {
      marginVertical: 9,
      paddingVertical: 9,
      borderTopColor: '#F0F2F1',
      borderBottomColor: '#F0F2F1',
      borderBottomWidth: showBorder ? 1 : 0,
      borderTopWidth: showBorder ? 1 : 0,
      flexDirection: 'row',
    },
    vendorZone: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    photoToShow: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    avatarPlaceholder: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    zone: {
      fontSize: 14,
    },
  })
}

export default VendorInfo
