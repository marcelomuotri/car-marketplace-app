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
import { useForm } from 'react-hook-form'
import { TFunction } from 'i18next'

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
  t: TFunction
}

const FiltersModal = ({
  isVisible,
  toggleModal,
  filters,
  categoriesToShow,
  categories,
  applyFilters,
  t,
}: FiltersModalProps) => {
  const { control, handleSubmit, setValue, reset } = useForm<any>({
    defaultValues: {
      category: filters?.category,
    },
  })

  useEffect(() => {
    console.log(filters)
    setValue('category', filters.category)
  }, [filters, setValue, isVisible])

  const subCategoriesToShow = categories?.find(
    (category: any) => category.name === filters?.category,
  )?.subCategories
  // getOptions(
  //   selectedCategoryValue,
  //   categories,
  //   'subCategories',
  // )
  console.log(subCategoriesToShow)
  //console.log(categories.find((category) => category.name === 'accesorios'))
  //hacer un object.keys como en la web me parece

  // const selectedSubCategoryValue = getValue(
  //   localFilters.subCategory,
  //   subCategoriesToShow,
  // )

  // const brandsToShow = getBrandOptions(selectedCategoryValue, categories)

  // const selectedVariant = variants.find((variant) =>
  //   variant.category.includes(selectedCategoryValue?.label.toLowerCase()),
  // )

  // const handleFilterChange = (key: string, value: string) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [key]: value,
  //   }))
  // }

  // const onHandleApplyFilters = () => {
  //   const filtersToApply = { ...localFilters }
  //   if (filtersToApply.subCategory) {
  //     filtersToApply.subCategory = selectedSubCategoryValue.value
  //   }

  //   applyFilters(filtersToApply)
  //   toggleModal()
  // }

  // const renderFieldVariant = () => {
  //   if (selectedVariant?.id === 1) {
  //     return (
  //       <ThemedInput
  //         control={control}
  //         type="select"
  //         title="Marca"
  //         placeholder="Seleccionar"
  //         value={localFilters.brand}
  //         onChange={(value) => handleFilterChange('brand', value)}
  //         options={brandsToShow.map((brand) => ({
  //           label: brand.label,
  //           value: brand.id,
  //         }))}
  //       />
  //     )
  //   }
  // Añadir más casos si es necesario
  //}

  const onCancelAndCloseModal = () => {
    toggleModal()
    reset()
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
          <TouchableOpacity onPress={onCancelAndCloseModal}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <ThemedInput
            name="category"
            control={control}
            type="select"
            label={t('category')}
            placeholder="Seleccionar"
            options={categoriesToShow.map((category) => ({
              label: category.label,
              value: category.label,
            }))}
          />
          <ThemedInput
            control={control}
            type="select"
            label="SubCategoría"
            placeholder="Seleccionar"
            name="subCategory"
            //esto lo haria con el watch o algo asi
            //onChange={(value) => handleFilterChange('subCategory', value)}
            options={subCategoriesToShow?.map((subCategory) => ({
              label: subCategory,
              value: subCategory,
            }))}
          />
          {/* {renderFieldVariant()} */}
        </View>
        {/* <ThemedButton title="Aplicar filtros" onPress={onHandleApplyFilters} /> */}
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
