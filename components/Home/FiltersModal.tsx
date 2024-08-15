import React, { useEffect, useState } from 'react'
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'
import BasicLayout from '../BasicLayout'
import ThemedInput from '../ThemedInput'
import ThemedButton from '../ThemedButton'
import CloseIcon from '@/assets/icons/CloseIcon'

interface FiltersModalProps {
  isVisible: boolean
  toggleModal: () => void
  applyFilters: (filters: any) => void
  selectedCategory: string | null
  selectedSubCategory: string | null
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
  applyFilters,
  selectedCategory,
  selectedSubCategory,
  categoriesToShow,
  categories,
}: FiltersModalProps) => {
  const [filters, setFilters] = useState({
    category: selectedCategory || '',
    subCategory: selectedSubCategory || '',
  })
  useEffect(() => {
    setFilters({
      category: selectedCategory || '',
      subCategory: selectedSubCategory || '',
    })
  }, [selectedCategory, selectedSubCategory])

  // Manejar los cambios en los filtros
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }

  const getValue = (filterValue: string, items: any[]) => {
    return items.find((item) => item.id === filterValue)
  }

  const selectedCategoryValue = getValue(filters.category, categoriesToShow)

  const subCategoryOptions = selectedCategoryValue
    ? categories
        .find(
          (category) =>
            category.name === selectedCategoryValue?.label.toLowerCase(),
        )
        ?.subCategories?.map((subCategory, index) => ({
          label:
            subCategory.charAt(0).toUpperCase() +
            subCategory.slice(1).toLowerCase(), // Primera letra en mayúscula, resto en minúscula
          value: subCategory.toLowerCase(), // Todo en minúsculas
          id: index.toString(), // Índice como string para el ID
        }))
    : []

  const onHandleApplyFilters = (filters) => {
    setFilters({
      category: '',
      subCategory: '',
    })
    applyFilters(filters)
  }

  return (
    <BasicLayout>
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
              value={getValue(filters.subCategory, subCategoryOptions)}
              onChange={(value) => handleFilterChange('subCategory', value)}
              options={subCategoryOptions?.map((subCategory) => ({
                label: subCategory.label,
                value: subCategory.id,
              }))}
            />
          </View>
          <ThemedButton
            title="Aplicar filtros"
            onPress={() => {
              onHandleApplyFilters(filters)
              toggleModal()
            }}
          />
        </View>
      </Modal>
    </BasicLayout>
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
