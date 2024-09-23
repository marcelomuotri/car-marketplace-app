import React, { useEffect, useState } from 'react'
import ProductList from '@/components/Home/ListProduct/ProductList'
import Loader from '@/components/Loader'
import { useGetAllProducts } from '@/state/api/productApi'
import { useGetAllCategories } from '@/state/api/categoriesApi'
import BasicLayout from '@/components/BasicLayout'
import CategoriesList from '@/components/Home/CategoriesList'
import TopBar from '@/components/Home/TopBar'
import FiltersModal from '@/components/Home/FiltersModal'
import { View, StyleSheet, ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useTranslation } from 'react-i18next'
import { competitionCategories, staticCategories } from '@/constants/Categories'
import BottomSheetDrawer from '@/components/BottomSheetDrawer'
import { Input, ListItem } from '@rneui/base'
import SearchIcon from '@/assets/icons/SearchIcon'
import { capitalizeFirstLetter } from '@/components/utils/formatter'
import { Product } from '@/types'
import { router } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import FilterButton from '@/components/FilterButton'
import { countAppliedFilters, cleanFilters } from '@/components/utils/functions'

export type ProductListProps = Pick<
  Product,
  'id' | 'title' | 'price' | 'photo1Url' | 'currency'
>

const Index: React.FC = () => {
  const { t } = useTranslation()
  const { userData } = useSelector((state: RootState) => state.auth)

  // Estado de filtros y visibilidad del modal de filtros
  const [filters, setFilters] = useState({
    competition: userData?.favoriteCompetition || 'auto',
    category: null,
    subCategory: null,
  })

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filtersApplied, setFiltersApplied] = useState(0)

  // Estado para manejar productos cargados y el cursor para la paginación
  const [cursor, setCursor] = useState(null)

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

  if (search) {
    productFilters.title = search
  }

  if (selectedCategoryLabel) {
    productFilters.category = selectedCategoryLabel
  }

  if (filters.subCategory) {
    productFilters.subCategory = filters.subCategory
  }

  useEffect(() => {
    const selectedCategoryLabel = categoriesToShow
      .find((category) => category.id === filters.category)
      ?.label.toLowerCase()

    setFilters((prevFilters: any) => {
      const updatedFilters = {
        ...prevFilters,
        competition: filters.competition, // Aseguramos que competition siempre sea un array
        category: selectedCategoryLabel || prevFilters.category,
        subCategory: filters.subCategory || prevFilters.subCategory,
      }

      // Si el campo de búsqueda tiene valor, lo establecemos, si no, lo dejamos en null
      updatedFilters.title = search && search.trim() !== '' ? search : null

      return updatedFilters
    })
  }, [search, selectedCategoryLabel, filters.subCategory])

  useEffect(() => {
    //aca cuenta los filtros que tiene aplicados excluyendo titulo y competicion
    setFiltersApplied(countAppliedFilters(filters))
  }, [filters])

  // Consulta de productos con límite de 2 por llamada
  const { products, isLoading, error, refetch } = useGetAllProducts({
    populate: ['title', 'price', 'photo1Url', 'currency'],
    filters: cleanFilters({
      ...filters,
      active: true,
      competition: [filters.competition],
    }),
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
    //esto aplica los filtros del modal
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }))
    setIsFilterModalVisible(false)
  }

  const onOpenSearchDrawer = () => {
    setIsSearchDrawerOpen(true)

    // Reiniciar el filtro de categoría al abrir el buscador
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: null, // O reiniciar cualquier otro filtro que necesites
    }))

    setCursor(null) // Reiniciar el cursor también si es necesario
    refetch()
  }

  const goToIdPage = (id: string) => {
    setIsSearchDrawerOpen(false)
    router.push({ pathname: 'productDetails/[id]', params: { id: id } })
  }

  if (isLoading || isLoadingCategories || !products || !categories) {
    return <Loader />
  }

  return (
    <BasicLayout>
      <TopBar
        selectedCompetition={filters.competition}
        setSelectedCompetition={(competition) =>
          setFilters((prev) => ({ ...prev, competition, category: null }))
        }
        setCursor={setCursor}
        uid={userData?.uid}
        t={t}
      />

      <Input
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        inputStyle={[styles.inputStyle]}
        placeholder="Buscar"
        leftIcon={<SearchIcon />}
        leftIconContainerStyle={{ marginRight: 6 }}
        onPress={onOpenSearchDrawer}
        value={search}
      />
      <BottomSheetDrawer
        isVisible={isSearchDrawerOpen}
        handleClose={() => setIsSearchDrawerOpen(false)}
        height={0.94}
      >
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          inputStyle={[styles.inputStyle]}
          placeholder="Buscar"
          leftIcon={<SearchIcon />}
          leftIconContainerStyle={{ marginRight: 15 }}
          onPress={() => setIsSearchDrawerOpen(true)}
          onChangeText={(text) => setSearch(text)}
          value={search}
          onSubmitEditing={() => setIsSearchDrawerOpen(false)}
        />
        <ScrollView>
          {products.map((item: ProductListProps) => {
            return (
              <ListItem
                key={item.id}
                onPress={() => goToIdPage(item.id)} // Mover el onPress al ListItem
              >
                <ListItem.Content>
                  <ListItem.Title>
                    {capitalizeFirstLetter(item.title)}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )
          })}
        </ScrollView>
      </BottomSheetDrawer>
      <CategoriesList
        filters={filters}
        setFilters={setFilters}
        categoriesToShow={categoriesToShow}
        setCursor={setCursor}
        setFiltersApplied={setFiltersApplied}
      />
      <View style={styles.header}>
        <ThemedText type="title">{t('featuredProducts')} </ThemedText>
        <FilterButton
          title="Filtros"
          filtersApplied={filtersApplied}
          onPress={() => setIsFilterModalVisible(true)}
        />
      </View>
      <ProductList
        setCursor={setCursor}
        products={products}
        refetch={refetch}
      />
      <FiltersModal
        filters={filters}
        categoriesToShow={categoriesToShow}
        isVisible={isFilterModalVisible}
        toggleModal={toggleModal}
        categories={categories}
        applyFilters={applyFilters}
        t={t}
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
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#F0F2F1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
  },
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: -30,
  },
  inputStyle: {
    color: '#C8C8CB',
    fontSize: 14,
  },
})

export default Index
