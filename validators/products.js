// utils/productParser.ts
import * as yup from 'yup'

// Esquema de validación para el producto
const productSchema = yup.object().shape({
  title: yup.string().required('title is mandatory'),
  description: yup.string().required('Description is mandatory'),
  imageUrl: yup.string().url('URL not valid').required('URL is mandatory'),
})

// Función para parsear un documento de Firestore a un objeto Product
// cuando viene incoming product
export const parseProduct = (doc) => {
  const data = doc.data()
  const id = doc.id
  // Validar los datos antes de convertirlos
  productSchema.validateSync(data)
  const product = {
    id,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
  }

  return product
}
