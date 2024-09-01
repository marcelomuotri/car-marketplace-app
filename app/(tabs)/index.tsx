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
  const [filters, setFilters] = useState({
    competition: 'auto',
    category: null,
    subCategory: null,
  })
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

  const competitionCategoryToShow = competitionCategories.filter(
    (category) => category.value === filters.competition,
  )

  const categoriesToShow = [...competitionCategoryToShow, ...staticCategories]

  const selectedCategoryLabel = categoriesToShow
    .find((category) => category.id === filters.category)
    ?.label.toLowerCase()

  const productFilters: any = {
    active: true,
    competition: [filters.competition],
  }

  if (selectedCategoryLabel) {
    productFilters.category = selectedCategoryLabel
  }

  if (filters.subCategory) {
    productFilters.subCategory = filters.subCategory
  }

  const { products, isLoading } = useGetAllProducts({
    populate: ['title', 'price', 'photo1Url', 'currency'],
    filters: productFilters,
  })

  const { categories, isLoadingCategories } = useGetAllCategories()

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: null,
      subCategory: null,
    }))
  }, [filters.competition])

  const toggleModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible)
  }

  const applyFilters = (newFilters: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }))
    setIsFilterModalVisible(false)
  }

  if (isLoading || isLoadingCategories || !products || !categories) {
    return <Loader />
  }

  return (
    <BasicLayout>
      <TopBar
        selectedCompetition={filters.competition}
        setSelectedCompetition={(competition) =>
          setFilters((prev) => ({ ...prev, competition }))
        }
      />
      <ThemedTextInput iconName="home" placeholder="Buscar" />
      <CategoriesList
        filters={filters}
        setFilters={setFilters}
        categoriesToShow={categoriesToShow}
      />
      <View style={styles.header}>
        <ThemedText type="title">{t('featuredProducts')} </ThemedText>
        <View style={styles.buttonContainer}>
          <FilterButton title={t('sort')} />
          <FilterButton
            title={t('filter')}
            filtersApplied={Object.keys(filters).length - 1} // -1 porque competition no cuenta como filtro
            onPress={toggleModal}
          />
        </View>
      </View>
      <ProductList
        products={products}
        filtersApplied={Object.keys(filters).length - 1}
      />
      <FiltersModal
        filters={filters}
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
