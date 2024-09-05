import { View, StyleSheet } from 'react-native'
import Loader from '@/components/Loader'

export default function OAuthRedirect() {
  return (
    <View style={styles.container}>
      <Loader />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
