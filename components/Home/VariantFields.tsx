import React from 'react'
import { Control, UseFormWatch } from 'react-hook-form'
import ThemedInput from '../ThemedInput'
import { TFunction } from 'i18next'
import { getModelsForBrand, reorderOptions } from './utils/fieldUtils'
import { provinces } from '@/constants/provinces'

interface VariantFieldsProps {
  activeVariant: number
  control: Control<any>
  t: TFunction
  categories: any
  categoryField: string | null
  watch: UseFormWatch<any>
  categoriesToShow: {
    id: string
    label: string
    value: string
    Icon: JSX.Element
  }[]
}

const VariantFields: React.FC<VariantFieldsProps> = ({
  activeVariant,
  control,
  t,
  categoriesToShow,
  categories,
  categoryField,
  watch,
}) => {
  const brandField = watch('brandName')
  const brandsToShow = reorderOptions(
    Object.keys(
      categories?.find((category: any) => category?.name === categoryField)
        ?.brands || {},
    ),
  )

  const modelsToShow = reorderOptions(
    getModelsForBrand(categories, categoryField, brandField),
  )

  switch (activeVariant) {
    case 1:
      return (
        <>
          <ThemedInput
            name="brandName"
            control={control}
            type="select"
            label={t('brand')}
            placeholder="Seleccionar"
            options={brandsToShow?.map((brand) => ({
              label: brand,
              value: brand,
            }))}
            // Aquí puedes agregar la lógica específica para las opciones si la necesitas
          />
          <ThemedInput
            name="modelName"
            control={control}
            type="select"
            label={t('model')}
            placeholder="Seleccionar"
            options={modelsToShow?.map((model) => ({
              label: model,
              value: model,
            }))}
          />
          <ThemedInput
            name="condition"
            control={control}
            type="radio"
            label={t('condition')}
            placeholder="Seleccionar"
            options={[
              { label: 'Nuevo', value: 'Nuevo' },
              { label: 'Usado', value: 'Usado' },
            ]}
          />
          <ThemedInput
            name="currency"
            control={control}
            type="radio"
            label={t('price')}
            placeholder="Seleccionar"
            options={[
              { label: 'USD', value: '1' },
              { label: 'ARS', value: '2' },
            ]}
          />
          <ThemedInput
            name="province"
            control={control}
            type="select"
            label={t('province')}
            placeholder="Seleccionar"
            options={provinces}
          />
        </>
      )
    case 2:
      return (
        <>
          <ThemedInput
            name="condition"
            control={control}
            type="radio"
            label={t('condition')}
            placeholder="Seleccionar"
            options={[
              { label: 'Nuevo', value: 'Nuevo' },
              { label: 'Usado', value: 'Usado' },
            ]}
          />
          <ThemedInput
            name="currency"
            control={control}
            type="radio"
            label={t('price')}
            placeholder="Seleccionar"
            options={[
              { label: 'USD', value: '1' },
              { label: 'ARS', value: '2' },
            ]}
          />
          <ThemedInput
            name="size"
            control={control}
            type="multiOption"
            label={t('Talle')}
            placeholder="Seleccionar"
            options={[
              { label: 'XS', value: 'xs' },
              { label: 'S', value: 's' },
              { label: 'M', value: 'm' },
              { label: 'L', value: 'l' },
              { label: 'XL', value: 'xl' },
              { label: 'XXL', value: 'xxl' },
            ]}
          />
          <ThemedInput
            name="homologation"
            control={control}
            type="checkbox"
            placeholder="Solo productos homologados"
          />
          <ThemedInput
            name="province"
            control={control}
            type="select"
            label={t('province')}
            placeholder="Seleccionar"
            options={provinces}
          />
        </>
      )
    case 3:
      return (
        <>
          <ThemedInput
            name="condition"
            control={control}
            type="radio"
            label={t('condition')}
            placeholder="Seleccionar"
            options={[
              { label: 'Nuevo', value: 'Nuevo' },
              { label: 'Usado', value: 'Usado' },
            ]}
          />
          <ThemedInput
            name="currency"
            control={control}
            type="radio"
            label={t('price')}
            placeholder="Seleccionar"
            options={[
              { label: 'USD', value: '1' },
              { label: 'ARS', value: '2' },
            ]}
          />
          <ThemedInput
            name="province"
            control={control}
            type="select"
            label={t('province')}
            placeholder="Seleccionar"
            options={provinces}
          />
        </>
      )
    case 4:
      return (
        <>
          <ThemedInput
            name="currency"
            control={control}
            type="radio"
            label={t('price')}
            placeholder="Seleccionar"
            options={[
              { label: 'USD', value: '1' },
              { label: 'ARS', value: '2' },
            ]}
          />
          <ThemedInput
            name="province"
            control={control}
            type="select"
            label={t('province')}
            placeholder="Seleccionar"
            options={provinces}
          />
        </>
      )
    default:
      return null
  }
}

export default VariantFields
