import React from 'react'
import { ThemedText } from '../ThemedText'
import { useTranslation } from 'react-i18next'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'

interface CategoriesListProps {
  filters: any
  setFilters: (filters: any) => void
  categoriesToShow: any
  setCursor: any
}

const CategoriesList = ({
  setFilters,
  categoriesToShow,
  setCursor,
}: CategoriesListProps) => {
  const { t } = useTranslation()

  const onHandleSelectCategory = (id: string) => {
    setCursor(null)
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      category: id,
      subCategory: null, // Reiniciar subCategoría al cambiar de categoría
    }))
  }

  return (
    <View>
      <ThemedText type="title">{t('categories')}</ThemedText>
      <FlatList
        data={categoriesToShow}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onHandleSelectCategory(item.id)}
          >
            <View style={styles.iconContainer}>{item.Icon}</View>
            <ThemedText type="categoryIcon">{item.label}</ThemedText>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    width: 85,
    height: 85,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',
    backgroundColor: '#E9FFF8',
    borderRadius: 8,
  },
  listContainer: {
    paddingVertical: 12,
  },
})

export default CategoriesList
