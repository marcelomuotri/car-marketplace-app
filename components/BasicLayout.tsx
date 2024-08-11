import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/useThemeColor'

const Layout = ({ children }: any) => {
  const backgroundColor = useThemeColor({}, 'background')

  // Crea un estilo usando una función que recibe el color como argumento
  const styles = createStyles(backgroundColor)

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const createStyles = (backgroundColor: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
      paddingHorizontal: 20,
    },
  })
}

export default Layout
