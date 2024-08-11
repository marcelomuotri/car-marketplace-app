import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useAuthService } from '@/state/services/authService'
import { useRouter } from 'expo-router'
import ProductList from '@/components/Home/ListProduct/ProductList'
import Loader from '@/components/Loader'
import { useGetAllProducts } from '@/state/api/productApi'
import BasicLayout from '@/components/BasicLayout'
import CategoriesList from '@/components/Home/CategoriesList'
import ThemedTextInput from '@/components/ThemedTextInput'
import TopBar from '@/components/Home/TopBar'

const Index: React.FC = () => {
  const router = useRouter()
  const { logoutUser } = useAuthService()

  const onSignOut = () => {
    logoutUser()
  }

  const { products, isLoading } = useGetAllProducts({
    populate: ['title', 'price', 'photo1Url', 'currency'],
  })

  return (
    <BasicLayout>
      {isLoading && <Loader />}
      <TopBar />
      <ThemedTextInput iconName="home" placeholder="Buscar" />
      <CategoriesList />
      <ProductList products={products} />
      {/* <Loader /> */}
    </BasicLayout>
  )
}

export default Index
