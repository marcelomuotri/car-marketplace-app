import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

const width = Dimensions.get('window').width

const Carrousel = ({ productArray }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = React.useRef<ICarouselInstance>(null)

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={260}
        data={productArray}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)} // Actualiza el índice activo
        loop={false}
      />
      <View style={styles.paginationContainer}>
        {productArray.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 284,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#333',
  },
  paginationContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333', // Color del punto activo
  },
  inactiveDot: {
    backgroundColor: '#ccc', // Color de los puntos inactivos
  },
  image: {
    width: '100%', // Ajusta el ancho al 100% del contenedor
    height: '100%',
  },
  imageContainer: {
    overflow: 'hidden', // Asegura que la imagen respete el borde redondeado
  },
})

export default Carrousel
