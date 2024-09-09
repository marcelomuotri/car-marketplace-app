import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native'
import { Product } from '@/types'
import { ThemedText } from '../ThemedText'
import { getCurrency } from '@/components/utils/getCurrency'
import { useRouter } from 'expo-router'
import { useIncrementProductField } from '@/state/api/productApi'
import { formatNumber } from '../utils/formatter'

interface ProductCardProps {
  product: Product
}

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.43

const ProductCard = ({ product }: ProductCardProps) => {
  const currency = getCurrency(product.currency)
  const router = useRouter()
  const { incrementField } = useIncrementProductField()

  const handlePress = () => {
    // Incrementar el contador de visitas
    incrementField(product.id, 'visitors')

    // Navegar a la pantalla de detalles del producto
    router.push({ pathname: 'productDetails/[id]', params: { id: product.id } })
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.product, { width: CARD_WIDTH }]}>
        <Image source={{ uri: product.photo1Url }} style={styles.image} />
        <View
          style={[styles.infoContainer, Platform.OS === 'ios' && styles.iosGap]}
        >
          <ThemedText type="default" numberOfLines={2} ellipsizeMode="tail">
            {product.title}
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {currency} {formatNumber(product.price)}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  product: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 6,
    backgroundColor: '#FAFAFC',
  },
  image: {
    width: '100%',
    height: 112, // Ajustar altura de la imagen
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  infoContainer: {
    padding: 13,
    borderRadius: 6,
    height: 80,
  },
  iosGap: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
})
