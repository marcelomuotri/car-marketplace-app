import React from 'react'
import { ThemedText } from '../ThemedText'
import { useTranslation } from 'react-i18next'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'

interface CategoriesListProps {
  selectedCompetition: string
  setSelectedCategory: (categoryId: string) => void
  categoriesToShow: any
}

const CategoriesList = ({
  setSelectedCategory,
  categoriesToShow,
}: CategoriesListProps) => {
  const { t } = useTranslation()

  const onHandleSelectCategory = (id: string) => {
    setSelectedCategory(id)
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
    padding: 5,
    backgroundColor: '#E9FFF8',
    borderRadius: 8,
  },
  listContainer: {
    paddingVertical: 12,
  },
})

export default CategoriesList
