import React from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { useDeleteFavorite, useGetAllFavorites } from '@/state/api/favoritesApi'
import { useGetProductsByIds } from '@/state/api/productApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { Favorites, Product } from '@/types'
import Loader from '@/components/Loader'
import { ListItem, Button } from '@rneui/themed'
import TrashIcon from '@/assets/icons/TrashIcon'
import { ThemedText } from '@/components/ThemedText'
import { getCurrency } from '@/components/utils/getCurrency'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

export type ProductSummary = Pick<
  Product,
  'id' | 'title' | 'price' | 'photo1Url' | 'currency' | 'visits'
>

const FavoritesScreen = () => {
  const { userData } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const { favorites, isLoading: isLoadingFavorites } = useGetAllFavorites({
    populate: [],
    filters: { uid: userData?.uid },
  })
  const { removeFavorite } = useDeleteFavorite()

  const productIds =
    favorites?.map((favorite: Favorites) => favorite.productId) || []
  const { products, isLoading: isLoadingProducts } = useGetProductsByIds({
    ids: productIds,
    populate: ['title', 'price', 'photo1Url', 'currency', 'visits'],
  })

  const productsWithFavoriteId =
    products?.map((product: ProductSummary) => ({
      ...product,
      favoriteId: favorites.find((fav) => fav.productId === product.id)?.id,
    })) || []

  if (isLoadingFavorites || isLoadingProducts) return <Loader />

  if (
    products?.length === 0 &&
    favorites?.length === 0 &&
    productsWithFavoriteId?.length === 0
  )
    return <Text>No hay favoritos para mostrar</Text>

  const onDeleteFavorite = (id: string) => {
    removeFavorite(id)
  }

  const handlePress = (id: string) => {
    router.push({ pathname: 'productDetails/[id]', params: { id: id } })
  }

  return (
    <View style={styles.container}>
      {productsWithFavoriteId?.map((product) => {
        return (
          <ListItem.Swipeable
            key={product.title}
            onPress={() => handlePress(product.id)}
            rightContent={() => (
              <Button
                onPress={() => onDeleteFavorite(product.favoriteId)}
                icon={<TrashIcon />}
                buttonStyle={{ minHeight: '100%', backgroundColor: '#D65B5B' }}
              />
            )}
          >
            <View style={styles.cardContainer}>
              <Image source={{ uri: product.photo1Url }} style={styles.image} />
              <View style={styles.description}>
                <View>
                  <ThemedText type="defaultSemiBold">
                    {product.title}
                  </ThemedText>
                  <ThemedText>Visitas: {product.visits}</ThemedText>
                </View>
                <ThemedText type="defaultSemiBold">
                  {getCurrency(product.currency)} {product.price}
                </ThemedText>
              </View>
            </View>
          </ListItem.Swipeable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 82,
    height: 76,
    borderRadius: 4,
  },
  description: {
    alignContent: 'space-around',
    justifyContent: 'space-around',
  },
})

export default FavoritesScreen
