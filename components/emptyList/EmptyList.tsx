import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'

interface EmptyListProps {
  title: string
  subTitle?: string
}

const EmptyList = ({ title, subTitle }: EmptyListProps) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="defaultSemiBold">
        {title}
      </ThemedText>
      {subTitle && <ThemedText style={styles.subTitle}>{subTitle}</ThemedText>}
      <Image
        source={require('../../assets/images/girlLooking.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
})

export default EmptyList
