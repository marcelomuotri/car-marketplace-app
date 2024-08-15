import React from 'react'
import { View, Modal, StyleSheet, Dimensions, Pressable } from 'react-native'
import CloseIcon from '@/assets/icons/CloseIcon'
import { ThemedText } from './ThemedText'

const windowHeight = Dimensions.get('window').height

interface BottomDrawerProps {
  isVisible: boolean
  handleClose: () => void
  header?: string
  children: any
}

const BottomDrawer = ({
  isVisible,
  handleClose,
  header,
  children,
}: BottomDrawerProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={[styles.bottomSheet, { height: windowHeight * 0.5 }]}>
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.headerText}>
            {header}
          </ThemedText>
          <Pressable onPress={handleClose}>
            <CloseIcon />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 23,
    paddingBottom: 16,
    paddingHorizontal: 20,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
  },
  content: {
    paddingVertical: 16,
  },
  contentText: {
    color: '#292929',
    fontSize: 18,
  },
})

export default BottomDrawer
