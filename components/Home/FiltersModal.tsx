import React, { useEffect, useState } from 'react'
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'
import ThemedInput from '../ThemedInput'
import ThemedButton from '../ThemedButton'
import CloseIcon from '@/assets/icons/CloseIcon'
import {
  getBrandOptions,
  getOptions,
  getSubCategoryOptions,
} from './utils/fieldUtils'
import { variants } from '../../constants/variants'

interface FiltersModalProps {
  isVisible: boolean
  toggleModal: () => void
  applyFilters: (filters: any) => void
  filters: any
  categoriesToShow: {
    id: string
    label: string
    value: string
    Icon: JSX.Element
  }[]
  categories: any
}

const FiltersModal = ({
  isVisible,
  toggleModal,
  filters,
  categoriesToShow,
  categories,
  applyFilters,
}: FiltersModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const getValue = (filterValue: string, items: any[]) => {
    return items.find((item) => item.id === filterValue)
  }

  const selectedCategoryValue = getValue(
    localFilters.category,
    categoriesToShow,
  )

  const subCategoriesToShow = getOptions(
    selectedCategoryValue,
    categories,
    'subCategories',
  )

  const selectedSubCategoryValue = getValue(
    localFilters.subCategory,
    subCategoriesToShow,
  )

  const brandsToShow = getBrandOptions(selectedCategoryValue, categories)

  const selectedVariant = variants.find((variant) =>
    variant.category.includes(selectedCategoryValue?.label.toLowerCase()),
  )

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const onHandleApplyFilters = () => {
    const filtersToApply = { ...localFilters }
    if (filtersToApply.subCategory) {
      filtersToApply.subCategory = selectedSubCategoryValue.value
    }

    applyFilters(filtersToApply)
    toggleModal()
  }

  const renderFieldVariant = () => {
    if (selectedVariant?.id === 1) {
      return (
        <ThemedInput
          type="select"
          title="Marca"
          placeholder="Seleccionar"
          value={localFilters.brand}
          onChange={(value) => handleFilterChange('brand', value)}
          options={brandsToShow.map((brand) => ({
            label: brand.label,
            value: brand.id,
          }))}
        />
      )
    }
    // Añadir más casos si es necesario
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <ThemedText style={styles.modalTitle} type="title">
            Filtros
          </ThemedText>
          <TouchableOpacity onPress={toggleModal}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <ThemedInput
            type="select"
            title="Categoría"
            label="Elige una opción"
            placeholder="Seleccionar"
            value={selectedCategoryValue}
            onChange={(value) => handleFilterChange('category', value)}
            options={categoriesToShow.map((category) => ({
              label: category.label,
              value: category.id,
            }))}
          />
          <ThemedInput
            type="select"
            title="SubCategoría"
            label="Elige una opción"
            placeholder="Seleccionar"
            value={selectedSubCategoryValue}
            onChange={(value) => handleFilterChange('subCategory', value)}
            options={subCategoriesToShow?.map((subCategory) => ({
              label: subCategory.label,
              value: subCategory.id,
            }))}
          />
          {renderFieldVariant()}
        </View>
        <ThemedButton title="Aplicar filtros" onPress={onHandleApplyFilters} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 16,
  },
  inputContainer: {
    gap: 12,
  },
})

export default FiltersModal
