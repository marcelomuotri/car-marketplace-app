import React, { useCallback, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  Platform,
  SafeAreaView,
} from 'react-native'
import ProductCard from '../../ProductCard/ProductCard'
import { Product } from '@/types'
import { useTranslation } from 'react-i18next'
import EmptyList from '@/components/emptyList/EmptyList'
import Loader from '@/components/Loader'

interface ListProductProps {
  products: Product[]
  refetch: () => Promise<void>
  setCursor: (cursor: string | null) => void
  isLoading: boolean
  error?: any
}

const ProductList = ({
  products,
  refetch,
  setCursor,
  isLoading,
  error,
}: ListProductProps) => {
  const { t } = useTranslation()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const onLoadMoreData = () => {
    if (products.length > 0) {
      const lastProduct = products[products.length - 1]
      setCursor(lastProduct.id)
    }
  }

  const renderItem = useCallback(
    ({ item }) => <ProductCard product={item} />,
    [],
  )

  if (isLoading && !refreshing) return <Loader />

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        // Elimina contentContainerStyle o asegúrate de que no tiene flexGrow
        // contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <EmptyList
            title={t('emptyProductsTitle')}
            subTitle={t('emptyProductsSubtitle')}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMoreData}
      />
    </SafeAreaView>
  )
}

export default React.memo(ProductList)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})
