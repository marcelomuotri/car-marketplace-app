import React from 'react'
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

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
        {header && <Text style={styles.headerText}>{header}</Text>}
        <View style={styles.header}>
          <Pressable onPress={handleClose}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    color: '#86827e',
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
