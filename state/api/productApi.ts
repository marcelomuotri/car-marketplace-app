// src/framework/api/productApi.js
import { useSelector } from 'react-redux'
import {
  useAddEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
  useGetEntitiesQuery,
  useGetEntitiesByIdsQuery,
} from '../api'
import { RootState } from '../store'
import { ProductUpload } from '@/types'

const base = 'products'

// Hook para obtener productos por usuario
export const useGetAllProducts = ({ populate, filters }: any) => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    populate,
    filters: { ...filters },
  })

  return {
    products: data,
    isLoading,
    error,
  }
}

export const useGetProductsByUser = () => {
  const userData = useSelector((state: RootState) => state.auth.userData)
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    filters: { uid: userData?.uid },
  })

  return {
    products: data,
    isLoading,
    error,
  }
}

export const useGetProductById = (id: string) => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    filters: { id: id },
  })

  return {
    product: data ? data[0] : null,
    isLoading,
    error,
  }
}

export const useGetProductsByIds = ({ ids, populate }: any) => {
  const { data, error, isLoading } = useGetEntitiesByIdsQuery({
    collectionPath: base,
    ids: ids,
    populate,
  })

  return {
    products: data,
    isLoading,
    error,
  }
}

// Hook para agregar un producto
export const useAddProduct = () => {
  const [addProduct, { isLoading, error }] = useAddEntityMutation()

  const addNewProduct = async (productData: ProductUpload) => {
    try {
      const result = await addProduct({
        collectionPath: base,
        data: {
          ...productData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
      return result
    } catch (e) {
      console.error('Failed to add product:', e)
    }
  }

  return { addNewProduct, isLoading, error }
}

export const useDeleteProduct = () => {
  const [deleteProduct, { isDeleting, error }] = useDeleteEntityMutation()

  const removeProduct = async (productId: string) => {
    try {
      const result = await deleteProduct({
        collectionPath: base,
        docId: productId,
      })
      return result
    } catch (e) {
      console.error('Failed to delete product:', e)
    }
  }

  return { removeProduct, isDeleting, error }
}

export const useUpdateProduct = () => {
  const [updateProduct, { isLoading: isUpdating, error }] =
    useUpdateEntityMutation()

  const updateProductData = async (productData: ProductUpload) => {
    try {
      const result = await updateProduct({
        collectionPath: base,
        data: productData,
      })
      return result
    } catch (e) {
      console.error('Failed to update product:', e)
    }
  }

  return { updateProductData, isUpdating, error }
}

// Hook para incrementar el campo 'contacts' de un producto
export const useIncrementProductField = () => {
  const [updateProduct, { isLoading: isIncrementing, error }] =
    useUpdateEntityMutation()

  const incrementField = async (productId: string, fieldName: string) => {
    try {
      const result = await updateProduct({
        collectionPath: 'products',
        data: { id: productId }, // Solo se pasa el ID del documento
        incrementField: fieldName, // Se pasa el campo que se desea incrementar
      })

      return result
    } catch (e) {
      console.error(`Failed to increment ${fieldName}:`, e)
    }
  }

  return { incrementField, isIncrementing, error }
}

// Puedes añadir aquí más hooks según sean necesarios
