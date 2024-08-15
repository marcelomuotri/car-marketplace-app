import React, { ReactNode } from 'react'
import { BottomSheet } from '@rneui/base'
import { View, StyleSheet, Pressable, Dimensions } from 'react-native'
import { ThemedText } from './ThemedText'
import CloseIcon from '@/assets/icons/CloseIcon'

const windowHeight = Dimensions.get('window').height

interface BottomSheetDrawerProps {
  isVisible: boolean
  children: ReactNode
  header?: string
  handleClose: () => void
  height?: number // Opcional
}

const BottomSheetDrawer = ({
  isVisible,
  children,
  header,
  handleClose,
  height, // No establecemos un valor por defecto aquí
}: BottomSheetDrawerProps) => {
  const styles = createStyles()
  return (
    <BottomSheet isVisible={isVisible}>
      <View
        style={[
          styles.sheetContainer,
          height ? { height: windowHeight * height } : { maxHeight: '100%' }, // Si height no está definido, se ajusta automáticamente
        ]}
      >
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
    </BottomSheet>
  )
}

const createStyles = () => {
  return StyleSheet.create({
    sheetContainer: {
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 23,
      paddingBottom: 16,
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 16,
    },
  })
}

export default BottomSheetDrawer
