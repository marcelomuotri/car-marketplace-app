import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'
import NotificationIcon from '@/assets/icons/NotificationIcon'

const TopBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <ThemedText type="small" style={{ color: '#C8C8CB' }}>
          Competicion
        </ThemedText>
        <ThemedText style={{ fontWeight: 500 }}>Autos</ThemedText>
      </View>
      <NotificationIcon />
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
})
