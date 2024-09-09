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
import ThemedButton from '@/components/ThemedButton'

const Index: React.FC = () => {
  const { t } = useTranslation()

  // Estado de filtros y visibilidad del modal de filtros
  const [filters, setFilters] = useState({
    competition: 'auto',
    category: null,
    subCategory: null,
  })

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

  // Configuración de categorías a mostrar
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

  // Estado para manejar productos cargados y el cursor para la paginación
  const [cursor, setCursor] = useState(null)

  // Consulta de productos con límite de 2 por llamada
  const { products, isLoading, error, refetch } = useGetAllProducts({
    populate: ['title', 'price', 'photo1Url', 'currency'],
    filters: productFilters,
    limitCount: 50,
    cursor,
  })

  // Obtener categorías
  const { categories, isLoadingCategories } = useGetAllCategories()

  // Alternar visibilidad del modal de filtros
  const toggleModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible)
  }

  // Aplicar los filtros seleccionados
  const applyFilters = (newFilters: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }))
    setIsFilterModalVisible(false)
  }

  // Mostrar loader mientras se cargan los productos o las categorías
  if (isLoading || isLoadingCategories || !products || !categories) {
    return <Loader />
  }

  return (
    <BasicLayout>
      {/* Botón para cargar más productos */}

      <TopBar
        selectedCompetition={filters.competition}
        setSelectedCompetition={(competition) =>
          setFilters((prev) => ({ ...prev, competition }))
        }
        setCursor={setCursor}
      />

      <ThemedTextInput iconName="home" placeholder="Buscar" />
      <CategoriesList
        filters={filters}
        setFilters={setFilters}
        categoriesToShow={categoriesToShow}
        setCursor={setCursor}
      />

      <View style={styles.header}>
        <ThemedText type="title">{t('featuredProducts')} </ThemedText>
        <View style={styles.buttonContainer}>
          <FilterButton title={t('sort')} />
          <FilterButton
            title={t('filter')}
            filtersApplied={Object.keys(filters).length - 1}
          />
        </View>
      </View>

      <ProductList
        filters={filters}
        setCursor={setCursor}
        products={products}
        filtersApplied={Object.keys(filters).length - 1}
        refetch={refetch}
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
})

export default Index
