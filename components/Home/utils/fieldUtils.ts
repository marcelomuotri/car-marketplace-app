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
      value: product?.homologation ? 'SI' : 'NO',
    },
    { id: 7, label: t('size'), value: product?.size },
  ]

  switch (product?.category) {
    case 'autos':
    case 'motos':
    case 'kartings':
    case 'ATVS':
      return fields.filter((field) => [0, 1, 2, 3, 5].includes(field.id))
    case 'equipamiento':
      return fields.filter((field) => [0, 1, 4, 6, 7].includes(field.id))
    case 'piezas de motor':
    case 'piezas de unidad':
    case 'accesorios':
    case 'herramientas':
      return fields.filter((field) => [0, 1, 4].includes(field.id))
    case 'servicios':
      return fields.filter((field) => [0, 1].includes(field.id))
    default:
      return [] // Devuelve un array vacío por defecto
  }
}
