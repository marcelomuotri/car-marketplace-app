import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const EngineIcon = ({ width = 27, height = 26 }) => {
  return (
    <View style={[styles.iconContainer, { width, height }]}>
      <Image
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwElEQVR4nO2YPWhUQRDH149Y+VFaWQhW2nmikNvJWQiCIAgSsBFRJIrGm7lgiEL0JbWFCIbM3ImFZRprFRRNBEU7sUulCBZiIRYK5k7ee3dyvo+797Xv7uD9YKv3dnf+O7szs6tUQUFBQRK04HMQaiVsq2pYSCHCaWpYSGpQIcQUUfa/Zno9CltrtZ+RYd814ys1zIQJUaMGFEJypmJZWzWTBUxf0uYR8LfvwFSv3L+y3bgQEBQDAlr/BwJisyIYZ52JhH5NLFdPZD2+blRL7fG/KVOAVE+D4AYwNbXQWXPzkLkoN850SDP+dCZhnFcGAVNCoD69VzN9dSfAh5lP0EMICK4FJlIt9LRXOWFHJBBc0Eyfff8xPivJ1JiKQHkZjwbM8zi+EAquGvqWE0yLIf+8OSZzu6IY0jbghWcRfsDSzJ6kQpT3W7+s2/GEltoZlZBAbzBS1P6QhZAsDprfG/R+cmVyy0gJKXu8oZn+2LkhzhgQoZI2LsTrDS10N+3VQAu9jCwkbAVSeUPw0/iD2R0qQ6CHkMCLUTbewFNZiugpxEtSISF5wxu5HsUdN3chvkjlb+uH713baUyIDnkYSDthuU4Hujzx267VohuLa2F3+1wOu8eYha7xro9c+O0AQh/bB/6JsqzNKgYwDAmxe1vZFfORRnV3nL4lmRpzbcCNgQtxthVTE+p4PHZfxvl2Evww8KLR3laa8U7cfppxpuONMtPJbvt8ZyZpGa8F30Yp491the/2r1jb4oiYEEI3wlEThC72SthOyRL4oSu8pb1Y2ataadT2xREBTFcdAW67rEwR56oLQgdjjS146Z8IqU4r05h4fNBcO++8yri7Yk7lRZbPQSB0riMCBG9mZ2VeD3Qttck+zPaFC9yzd0MNCmBc6lMgRm231MAfsQVvp3jEXi8LXhioiIKCggKVJ38Bl9/gRjPdJ0kAAAAASUVORK5CYII=',
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

export default EngineIcon
