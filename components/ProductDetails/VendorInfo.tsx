import React, { useState } from 'react'
import { ThemedText } from '../ThemedText'
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
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

  const [modalVisible, setModalVisible] = useState(false) // Estado para controlar el modal

  const renderAvatar = () => {
    if (user?.photoToShowUrl) {
      return (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{ uri: user.photoToShowUrl }}
            style={styles.photoToShow}
          />
        </TouchableOpacity>
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
      </View>

      {/* Modal para mostrar la imagen en grande */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={{ uri: user?.photoToShowUrl }}
              style={styles.enlargedPhoto}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalBackground: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    enlargedPhoto: {
      width: 300,
      height: 300,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  })
}

export default VendorInfo
