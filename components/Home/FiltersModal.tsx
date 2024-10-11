import React, { useEffect, useState } from 'react'
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native'
import { ThemedText } from '../ThemedText'
import ThemedInput from '../ThemedInput'
import ThemedButton from '../ThemedButton'
import CloseIcon from '@/assets/icons/CloseIcon'

import { variants } from '../../constants/variants'
import { useForm } from 'react-hook-form'
import { TFunction } from 'i18next'
import VariantFields from './VariantFields' // Importa el nuevo componente
import { reorderOptions } from './utils/fieldUtils'
import SecondaryButton from './SecondaryButton'

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
  const { control, handleSubmit, setValue, reset, watch } = useForm<any>({
    defaultValues: {
      category: filters?.category,
      subCategory: filters?.subCategory,
      modelName: filters?.modelName,
      brandName: filters?.brandName,
    },
  })
  const [activeVariant, setActiveVariant] = useState(0)
  const categoryField = watch('category')

  useEffect(() => {
    setValue('category', filters.category)
    setValue('subCategory', filters.subCategory)
    setValue('modelName', filters.modelName)
    setValue('brandName', filters.brandName)
  }, [filters, setValue, isVisible])

  useEffect(() => {
    //limpiar cuando cambia categoria
    setValue('subCategory', null)
    setValue('brandName', null)
    setValue('modelName', null)
    setValue('condition', null)
    setValue('currency', null)
    setValue('size', null)
    setValue('homologation', null)
    setValue('province', null)

    const v = variants.find((variant) =>
      variant.category.includes(categoryField),
    )
    setActiveVariant(v?.id || 0)
  }, [categoryField, setValue])

  const subCategoriesToShow = reorderOptions(
    categories?.find((category: any) => category.name === categoryField)
      ?.subCategories,
  )

  const onCancelAndCloseModal = () => {
    toggleModal()
    //reset()
  }

  const onDeleteFilters = () => {
    reset()
    setValue('category', null)
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
          <ThemedText style={styles.modalTitle} type="defaultSemiBold">
            Filtros
          </ThemedText>
          <TouchableOpacity onPress={onCancelAndCloseModal}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <SecondaryButton
          style={{
            padding: 0,
            paddingTop: 5,
            alignItems: 'flex-end',
          }}
          title={'Borrar filtros'}
          underline
          onPress={onDeleteFilters}
        />
        <View style={styles.inputContainer}>
          <ThemedInput
            name="category"
            control={control}
            type="select"
            label={t('category')}
            placeholder="Seleccionar"
            options={categoriesToShow?.map((category) => ({
              label: category.label.toLowerCase(),
              value: category.label.toLowerCase(),
            }))}
          />
          <ThemedInput
            control={control}
            type="select"
            label="SubCategoría"
            placeholder="Seleccionar"
            name="subCategory"
            options={subCategoriesToShow?.map((subCategory) => ({
              label: subCategory,
              value: subCategory,
            }))}
          />
          {/* Usar el nuevo componente VariantFields aquí */}
          <VariantFields
            activeVariant={activeVariant}
            control={control}
            t={t}
            categoryField={categoryField}
            categoriesToShow={categoriesToShow}
            categories={categories}
            watch={watch}
          />
        </View>
        <ThemedButton
          title="Aplicar filtros"
          onPress={handleSubmit(applyFilters)}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: Platform.select({
      ios: 50,
    }),
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
    paddingBottom: 24,
  },
})

export default FiltersModal
