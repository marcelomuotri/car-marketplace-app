import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { Product } from '@/types'
import { ThemedText } from '../ThemedText'
import { router } from 'expo-router'
import { getCurrency } from '@/components/utils/getCurrency'
import { Link } from 'expo-router'

interface ProductCardProps {
  product: Product
}

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.43

const ProductCard = ({ product }: ProductCardProps) => {
  const currency = getCurrency(product.currency)

  return (
    <Link
      href={{ pathname: 'productDetails/[id]', params: { id: product.id } }}
      asChild
    >
      <Pressable>
        <View style={[styles.product, { width: CARD_WIDTH }]}>
          <Image source={{ uri: product.photo1Url }} style={styles.image} />
          <View style={{ padding: 13 }}>
            <ThemedText type="default">{product.title}</ThemedText>
            <ThemedText type="defaultSemiBold">
              {currency} {product.price}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </Link>
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
    height: 210,
  },
  image: {
    width: '100%',
    height: 112, // Ajustar altura de la imagen
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
