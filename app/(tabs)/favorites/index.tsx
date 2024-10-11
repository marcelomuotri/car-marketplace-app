import React from 'react'
import { View, StyleSheet, Image, StatusBar } from 'react-native'
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
import { useRouter } from 'expo-router'
import EmptyList from '@/components/emptyList/EmptyList'
import { useTranslation } from 'react-i18next'
import { formatNumber } from '@/components/utils/formatter'

export type ProductSummary = Pick<
  Product,
  'id' | 'title' | 'price' | 'photo1Url' | 'currency' | 'visitors'
> & {
  favoriteId: string
}

const FavoritesScreen = () => {
  const { userData, loading } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const { t } = useTranslation()

  const { favorites, isLoading: isLoadingFavorites } = useGetAllFavorites({
    populate: [],
    filters: { uid: userData?.uid },
  })
  const { removeFavorite, isLoadingRemoveFavorite } = useDeleteFavorite()

  const productIds =
    favorites?.map((favorite: Favorites) => favorite.productId) || []
  const { products, isFetching } = useGetProductsByIds({
    ids: productIds,
    populate: ['title', 'price', 'photo1Url', 'currency', 'visitors'],
  })
  const productsWithFavoriteId =
    products?.map((product: ProductSummary) => ({
      ...product,
      favoriteId: favorites.find(
        (fav: Favorites) => fav.productId === product.id,
      )?.id,
    })) || []

  if (isLoadingFavorites || isFetching || isLoadingRemoveFavorite)
    return <Loader />

  if (products?.length === 0) return <EmptyList title={t('emptyFavorites')} />

  const onDeleteFavorite = (id: string) => {
    removeFavorite(id)
  }

  const handlePress = (id: string) => {
    router.push({ pathname: 'productDetails/[id]', params: { id: id } })
  }

  return (
    <>
      <View style={styles.container}>
        {productsWithFavoriteId?.map((product: ProductSummary) => {
          return (
            <ListItem.Swipeable
              key={product.title}
              onPress={() => handlePress(product.id)}
              rightContent={() => (
                <Button
                  onPress={() => onDeleteFavorite(product.favoriteId)}
                  icon={<TrashIcon />}
                  buttonStyle={{
                    minHeight: '100%',
                    backgroundColor: '#D65B5B',
                  }}
                />
              )}
            >
              <View style={styles.cardContainer}>
                <Image
                  source={{ uri: product.photo1Url }}
                  style={styles.image}
                />
                <View style={styles.description}>
                  <View>
                    <ThemedText type="defaultSemiBold">
                      {product.title}
                    </ThemedText>
                    <ThemedText>Visitas: {product.visitors}</ThemedText>
                  </View>
                  <ThemedText type="defaultSemiBold">
                    {/* {getCurrency(product.currency)} {product.price} */}
                    {product?.price
                      ? `${getCurrency(product.currency)} ${formatNumber(product.price)}`
                      : 'Solicitar cotización'}
                  </ThemedText>
                </View>
              </View>
            </ListItem.Swipeable>
          )
        })}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
