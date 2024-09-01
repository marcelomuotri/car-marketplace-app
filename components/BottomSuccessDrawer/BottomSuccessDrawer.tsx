import React from 'react'
import BottomSheetDrawer from '../BottomSheetDrawer'
import { View, StyleSheet } from 'react-native'
import SuccessIcon from '@/assets/icons/SuccessIcon'
import { ThemedText } from '../ThemedText'
import ThemedButton from '../ThemedButton'

interface BottomSuccessDrawerProps {
  isVisible: boolean
  handleCloseDrawer: () => void
  title?: string
  subTitle?: string
}

const BottomSuccessDrawer = ({
  isVisible,
  handleCloseDrawer,
  title,
  subTitle,
}: BottomSuccessDrawerProps) => {
  return (
    <BottomSheetDrawer isVisible={isVisible} handleClose={handleCloseDrawer}>
      <View style={styles.container}>
        <SuccessIcon />
        {title && <ThemedText style={styles.title}>{title}</ThemedText>}
        {subTitle && (
          <ThemedText style={styles.subTitle}>{subTitle}</ThemedText>
        )}
        <ThemedButton
          style={{ width: '100%', marginTop: 80 }}
          title="Continuar"
          onPress={handleCloseDrawer}
        ></ThemedButton>
      </View>
    </BottomSheetDrawer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 28,
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: 400,
    color: '#939393',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
})

export default BottomSuccessDrawer
