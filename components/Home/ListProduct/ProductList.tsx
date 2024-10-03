import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native'
import ProductCard from '../../ProductCard/ProductCard'
import { Product } from '@/types'

import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import EmptyList from '@/components/emptyList/EmptyList'
import Loader from '@/components/Loader'

interface ListProductProps {
  products: Product[]
  refetch: any
  setCursor: any
  isLoading: boolean
}

const ProductList = ({
  products,
  refetch,
  setCursor,
  isLoading,
}: ListProductProps) => {
  const { t } = useTranslation()
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch() // Esta es la función que recargará tus productos
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setRefreshing(false)
    }
  }

  if (isLoading) return <Loader />

  if (products?.length === 0) {
    return (
      <View>
        <EmptyList
          title={t('emptyProductsTitle')}
          subTitle={t('emptyProductsSubtitle')}
        />
      </View>
    )
  }

  const onLoadMoreData = () => {
    setCursor(products[products.length - 1].id)
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        columnWrapperStyle={styles.row}
        ListFooterComponent={Platform.select({
          ios: <View style={styles.iosFooter} />,
          android: <View style={styles.androidFooter} />,
        })}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMoreData}
      />
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iosFooter: {
    height: 20,
  },
  androidFooter: {
    height: 55,
  },
})
