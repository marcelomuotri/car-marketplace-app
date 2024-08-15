import React, { useEffect, useState } from 'react'
import ProductList from '@/components/Home/ListProduct/ProductList'
import Loader from '@/components/Loader'
import { useGetAllProducts } from '@/state/api/productApi'
import { useGetAllCategories } from '@/state/api/categoriesApi'
import BasicLayout from '@/components/BasicLayout'
import CategoriesList from '@/components/Home/CategoriesList'
import ThemedTextInput from '@/components/ThemedTextInput'
import TopBar from '@/components/Home/TopBar'
import FiltersModal from '@/components/Home/FiltersModal'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import FilterButton from '@/components/FilterButton'
import { useTranslation } from 'react-i18next'
import { competitionCategories, staticCategories } from '@/constants/Categories'

const Index: React.FC = () => {
  const { t } = useTranslation()
  const [filtersApplied, setFiltersApplied] = useState(0)
  const [selectedCompetition, setSelectedCompetition] = useState('auto')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  )
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

  const competitionCategoryToShow = competitionCategories.filter(
    (category) => category.value === selectedCompetition,
  )

  const categoriesToShow = [...competitionCategoryToShow, ...staticCategories]

  // Buscar el valor de la categoría seleccionada
  const selectedCategoryLabel = categoriesToShow
    .find((category) => category.id === selectedCategory)
    ?.label.toLowerCase()

  // Configura los filtros
  const filters: any = {
    active: true,
    competition: [selectedCompetition],
  }

  if (selectedCategoryLabel) {
    filters.category = selectedCategoryLabel // Usar el label de la categoría convertida en minúscula
  }

  if (selectedSubCategory) {
    filters.subCategory = selectedSubCategory
  }
  //

  const { products, isLoading } = useGetAllProducts({
    populate: ['title', 'price', 'photo1Url', 'currency'],
    filters: filters,
  })

  const { categories, isLoadingCategories } = useGetAllCategories()

  useEffect(() => {
    setSelectedCategory(null)
    setSelectedSubCategory(null)
  }, [selectedCompetition])

  const toggleModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible)
  }

  if (isLoading || isLoadingCategories) {
    return <Loader />
  }

  const applyFilters = (filters: { category: string; subCategory: string }) => {
    setSelectedCategory(filters.category)
    setSelectedSubCategory(filters.subCategory)
    setIsFilterModalVisible(false) // Cerrar el modal después de aplicar los filtros
  }

  return (
    <BasicLayout>
      <TopBar
        selectedCompetition={selectedCompetition}
        setSelectedCompetition={setSelectedCompetition}
      />
      <ThemedTextInput iconName="home" placeholder="Buscar" />
      <CategoriesList
        selectedCompetition={selectedCompetition}
        setSelectedCategory={setSelectedCategory}
        categoriesToShow={categoriesToShow}
      />
      <View style={styles.header}>
        <ThemedText type="title">{t('featuredProducts')} </ThemedText>
        <View style={styles.buttonContainer}>
          <FilterButton title={t('sort')} />
          <FilterButton
            title={t('filter')}
            filtersApplied={filtersApplied}
            onPress={toggleModal}
          />
        </View>
      </View>
      <ProductList products={products} filtersApplied={filtersApplied} />
      <FiltersModal
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        categoriesToShow={categoriesToShow}
        isVisible={isFilterModalVisible}
        toggleModal={toggleModal}
        categories={categories}
        applyFilters={applyFilters}
      />
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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

export default Index
