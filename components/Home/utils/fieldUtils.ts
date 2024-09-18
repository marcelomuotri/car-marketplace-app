import { Product } from '@/types'

// utils/fieldUtils.ts
export const getFieldsToShow = (product: Product, t: Function) => {
  const fields = [
    { id: 0, label: t('description'), value: product?.description },
    { id: 1, label: t('subCategory'), value: product?.subCategory },
    { id: 2, label: t('brand'), value: product?.brand?.label },
    { id: 3, label: t('model'), value: product?.model?.label },
    { id: 4, label: t('condition'), value: product?.condition },
    { id: 5, label: t('year'), value: product?.year },
    {
      id: 6,
      label: t('homologation'),
      value: product?.homologation,
    },
    { id: 7, label: t('size'), value: product?.size },
  ]

  switch (product?.category) {
    case 'autos':
    case 'motos':
    case 'karting':
    case 'ATVS':
      return fields.filter((field) => [0, 1, 2, 3, 5].includes(field.id))
    case 'indumentaria':
      return fields.filter((field) => [0, 1, 4, 6, 7].includes(field.id))
    case 'motores':
    case 'partes':
    case 'accesorios':
    case 'herramientas':
      return fields.filter((field) => [0, 1, 4].includes(field.id))
    case 'servicios':
      return fields.filter((field) => [0, 1].includes(field.id))
    default:
      return [] // Devuelve un array vacío por defecto
  }
}

//funcion para armar las distintas subcategories
export const getSubCategoryOptions = (selectedCategoryValue, categories) => {
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
  return subCategoryOptions
}

export const getBrandOptions = (selectedCategoryValue, categories) => {
  if (!selectedCategoryValue) return []

  const subCategoryOptions = categories.find(
    (category) => category.name === selectedCategoryValue?.label.toLowerCase(),
  )

  if (!subCategoryOptions?.brands) return []

  const brandsOptions = Object.keys(subCategoryOptions.brands).map(
    (brand, index) => ({
      label: brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase(), // Primera letra en mayúscula, resto en minúscula
      value: brand.toLowerCase(), // Todo en minúsculas
      id: index.toString(), // Índice como string para el ID
    }),
  )

  return brandsOptions
}

export const getOptions = (
  selectedCategoryValue: any,
  categories: any[],
  field: string,
  shouldUseKeys: boolean = false,
) => {
  if (!selectedCategoryValue) return []

  const categoryOptions = categories.find(
    (category) => category.name === selectedCategoryValue?.label.toLowerCase(),
  )

  if (!categoryOptions || !categoryOptions[field]) return []

  const items = shouldUseKeys
    ? Object.keys(categoryOptions[field])
    : categoryOptions[field]

  const options = items.map((item: string, index: number) => ({
    label: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
    value: item.toLowerCase(),
    id: index.toString(),
  }))

  return options
}
