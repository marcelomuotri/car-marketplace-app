// types.ts

export interface UserData {
  userEmail: string
  uid: string
  name: string | null
  surname: string | null
  birthdate: string | null
  role: string
  createdAt: string
  verifiedStatus: string
  phoneNumber: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  description: string | null
  photoProfileUrl: string | null
  photoFrontIdUrl: string | null
  photobackIdUrl: string | null
  verifiedAt: string | null
  updatedAt: string | null
  contactEmail: string | null
  photoToShowUrl: string | null
  isSeller: boolean
  nameToShow: string | null
  dni: string | null
}

export type BuyerProfile = Pick<
  UserData,
  'name' | 'surname' | 'phoneNumber' | 'address' | 'city' | 'state'
>

export interface AuthState {
  user: string | null
  loading: boolean
  error: string | null
  userData: UserData
}

export interface SignInPayload {
  email: string
  password: string
}

export interface ProductUpload {
  uid: string
  title: string
  description: string
  price?: string | ''
  applyPrice?: boolean
  currency?: string | ''
  photo1Url?: string | null
  photo2Url?: string | null
  photo3Url?: string | null
  year?: string
  condition?: string
  location?: string
  featured?: boolean
  category?: string
  subCategory?: string
  brand?: string
  model?: string
  size?: string
  homologation?: boolean | null
  competition?: string[]
  active: boolean
  visitors: number
  contacts: number
}

export interface Product extends ProductUpload {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryData {
  subCategories: string[]
  brands: { [brand: string]: string[] }
  condition: string[]
  year: string
  size?: string[]
  homologation?: boolean[]
  competition?: string[]
}

export interface SupportQueryUpload {
  subject: string
  description: string
}

export interface SupportQuery extends SupportQueryUpload {
  email: string
  uid: string
  name: string | null
  createdAt: string
}

export interface FavoritesUpload {
  uid: string
  productId: string
}

export interface Favorites extends FavoritesUpload {
  uid: string
  productId: string
  createdAt: string
}
