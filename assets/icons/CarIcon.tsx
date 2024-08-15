import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const CarIcon = ({ width = 31, height = 30 }) => {
  return (
    <View style={[styles.iconContainer, { width, height }]}>
      <Image
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE6ElEQVR4nO2YaWhcVRTHn9pqEeuO4vZBqAgiCgZrkjlnBmlFv4hrVBSXikbbNHPOiwQXhFEQjFTBuGTOmYmEolIpCgU/uLSuQSm1Vmtp0Q+1blHRqmhbq9g2ct6SvnmZJGMy0zRyfzCESe5995z/PduL5zkcDofD4XA4HA6Hw+FwOBwOR51o0vbZmZLfDMo3o/DdWfVvRKHsZb2dR3j/V3LadSIq3wrCL4PyDlQeTn9AaCcorcIiX5ErFGZ5M53WPjobhbpReRCE91Q6y1tA6UVU7kPl51HpI1TaO/J3pe9B6dFc2Z/nzRTaVrYdZqEMQstQ6IsKh5X/AuHXQWkxPtt1RrX9LX33nATKPipvHtkrvA+U3sYS35QbKMzxDjZa+7vnQpGvReXloLw95bR9X25/t3VJR7Mlvg6FH0bhEgg9mVG6vbW/49R4TVaoBYWfS6XLr6j0FJTz502bw7EDmSLdgsKv2s1W5jJtReVeUF5oxc7WWz5DOd+ESg+h8PpkqKf27kWh1fbsJm0/0vaacOFZtLpirfD6rDI1l/3jvYYz7B2CyheYA6D0cSqXLbcHLdct5+Mtub78uSDUhUqvofKulLO7LB1Q+BFLCQv7oDgK7d7vIP1iQmaK/vnxM+3mLQLCSNhfOC1SUDtbG+Y/WA5WhvYOM9iqulX39HpUXlP1hoU/sbaXTIckuQE6FtRfEkZJ5W2jcAf0LT4uXFeYYzUhsEt4X2LtZhOzmk1TAtO3V6I7x2tTo8J1VLvjPaC8DYTeAqUyKt2PQtdnNX/hgqc7TrBn2M1bBESREN/2buscIPkFXqFwaCBG2Z9n3cK6RkXBVX4pW8xfEq+rkwC0NeHI4IR9v+jPB/VvAOEHQLk/vDH6Kt0SJ/lZU3FeoTDL5oegLiWeD0o/R2l4n6XxpAQB4S3hDfiLgoIUPdybJOesLByeLebPwhJdGtQAoWWg/EqQIsq/1yIAKL0x1vObi/5pKPRg6sLi6PsRlB5P1qsJQeU7qhlRy15QfhOE11nn8KYBE9ouDoQHQPjL5HyByu9k1b94wodAWPDSY+v7NrujEAeTnvL2qO8PWnuyW7a9qLw2ystNjRKhFjtGBBFqAWEB4d8SvryQe2bJUWMegFEbSw4qNs2h8MYxw1R4Y67UeXo03W2qQ85XrT212jHKJ6F3U53tw/EEGE6GvA04oPRZ9PuvQelKUzAYWkr+Vaj8eVQ0P7XiZCKEs/7UBbDIm6wd1XxKCLCtZgFA/EXxoah8Cgo9FrQh4SFU7rmonD955F2gRLd5DWIqdiScfyL+WbMAaJOfqRa+A/RUuamerNDV6RurN1OxI73W/j8x5kGg9I8timd7FP4prAndcyO1h20UzWgeorwbmt/beXTcdhomwBTsiMWLP+O2RVD6IQyjpWeGm+nP9MF2aLbEGB+8UO89JlJ+Z8MEqIMdKLQiqhN3jSfAqkip3qDwCK8Lv+evqRZ6NpraaBt9X9soAephh72bhGLRijEPymgeqo2vIPxtUHzscLuBqPhYu0Sl7+rY+iboDHWwQ3hoXLUzwpeD0gYU+jul8jeg1Ga5FoRboPiBc75edoDye/8p/DBoO8HsPpZBG2yN12Cm1Y4mbZ+Nml9qUxQK/WEfEP7A3t3jjnEgOFjscDgcDofD4XA4HA6Hw+FwOBzejOVfzY/2JvpvkOwAAAAASUVORK5CYII=',
        }}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})

export default CarIcon
