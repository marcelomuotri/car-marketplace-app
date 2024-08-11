import React from 'react'
import { Text, FlatList, StyleSheet, View } from 'react-native'
import ProductCard from '../../ProductCard/ProductCard'
import { Product } from '@/types'
import { ThemedText } from '../../ThemedText'
import FilterButton from '../../FilterButton'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'

interface ListProductProps {
  products: Product[]
}

const ProductList = ({ products }: ListProductProps) => {
  const { t } = useTranslation()
  if (products?.length === 0) {
    return <Text>No products available.</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">{t('featuredProducts')} </ThemedText>
        <View style={styles.buttonContainer}>
          <FilterButton title={t('sort')} />
          <FilterButton title={t('filter')} filtersApplied={2} />
        </View>
      </View>
      <View>
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
        />
      </View>
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
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
