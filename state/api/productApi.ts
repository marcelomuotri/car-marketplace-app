// src/framework/api/productApi.js
import { useSelector } from 'react-redux'
import {
  useAddEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
  useGetEntitiesQuery,
} from '../api'
import { RootState } from '../store'
import { ProductUpload } from '@/types'

const base = 'products'

// Hook para obtener productos por usuario
export const useGetAllProducts = ({ populate }: any) => {
  const { data, error, isLoading } = useGetEntitiesQuery({
    collectionPath: base,
    populate,
    filters: { active: true },
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
      //   enqueueSnackbar('Producto añadido con éxito', {
      //     variant: 'success',
      //   })
      return result
    } catch (e) {
      console.error('Failed to add product:', e)
      //   enqueueSnackbar('Error al añadir el producto', {
      //     variant: 'error',
      //   })
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
      //   enqueueSnackbar('Publicación eliminada con éxito', {
      //     variant: 'success',
      //   })
      return result
    } catch (e) {
      console.error('Failed to delete product:', e)
      //   enqueueSnackbar('Error al eliminar la publicación', {
      //     variant: 'error',
      //   })
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
      //   enqueueSnackbar('Publicación editada con éxito', {
      //     variant: 'success',
      //   })
      return result
    } catch (e) {
      console.error('Failed to update product:', e)
      //   enqueueSnackbar('Error al editar la publicación', {
      //     variant: 'error',
      //   })
    }
  }

  return { updateProductData, isUpdating, error }
}

// Puedes añadir aquí más hooks según sean necesarios
