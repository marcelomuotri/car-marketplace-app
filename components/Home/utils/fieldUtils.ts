import { Product } from '@/types'

// utils/fieldUtils.ts
export const getFieldsToShow = (product: Product, t: Function) => {
  console.log(product)
  const fields = [
    { id: 0, label: t('description'), value: product?.description },
    { id: 1, label: t('subCategory'), value: product?.subCategory },
    {
      id: 2,
      label: t('brand'),
      value: product?.brand?.label || product?.brand,
    },
    {
      id: 3,
      label: t('model'),
      value: product?.model?.label || product?.model,
    },
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

export const parseFilters = (newFilters: any) => {
  const categoryMapping: { [key: string]: string } = {
    autos: 'auto',
    motos: 'moto',
    kartings: 'karting',
    atvs: 'atv',
  }
  // Extraemos la categoría original
  const originalCategory = newFilters.category

  // Buscamos si la categoría original necesita ser mapeada
  const mappedCategory = categoryMapping[originalCategory] || originalCategory

  // Retornamos un nuevo objeto con el campo 'category' modificado
  return {
    ...newFilters, // Copiamos todos los demás campos
    category: mappedCategory, // Actualizamos 'category' si corresponde
  }
}

// src/utils/categoryUtils.ts
export const getModelsForBrand = (
  categories: any[],
  categoryField: string | null,
  selectedBrand: string | null,
): string[] => {
  // Si no hay categoría seleccionada o marca seleccionada, retornamos un array vacío
  if (!categoryField || !selectedBrand) {
    return []
  }

  // Encontrar la categoría que contiene la marca seleccionada
  const selectedCategory = categories?.find(
    (category) => category?.name === categoryField,
  )

  // Si no hay categoría o no hay marcas, retornamos un array vacío
  if (!selectedCategory || !selectedCategory.brands) {
    return []
  }

  // Retornamos los modelos de la marca seleccionada, si existe, o un array vacío
  return selectedCategory.brands[selectedBrand] || []
}

export const reorderOptions = (
  options: string[] = [], // Default value as empty array
  targetValue = 'otros',
): string[] => {
  // Verificar si options es un array, si no lo es, retornar un array vacío
  if (!Array.isArray(options)) {
    return []
  }

  // Crear una copia del array original para evitar modificarlo directamente
  const optionsCopy = [...options]

  // Ordenar alfabéticamente la copia del array de strings
  const sortedOptions = optionsCopy.sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' }),
  )

  // Encontrar el índice de la opción que queremos mover al final
  const targetIndex = sortedOptions.findIndex(
    (option) => option.toLowerCase() === targetValue.toLowerCase(),
  )

  // Si la opción existe y no está ya al final, moverla al final
  if (targetIndex >= 0 && targetIndex !== sortedOptions.length - 1) {
    const [targetOption] = sortedOptions.splice(targetIndex, 1) // Eliminar la opción del array
    sortedOptions.push(targetOption) // Añadir la opción al final del array
  }

  return sortedOptions
}

export const cleanFilters = (filters: any) => {
  // Crear un nuevo objeto sin las propiedades que estén en null, undefined o vacío
  const cleanedFilters: any = {}

  Object.keys(filters).forEach((key) => {
    const value = filters[key]
    if (value !== null && value !== undefined && value !== '') {
      cleanedFilters[key] = value // Solo se añaden propiedades con valores válidos
    }
  })

  return cleanedFilters
}
