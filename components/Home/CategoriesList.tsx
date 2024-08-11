import React from 'react'
import { ThemedText } from '../ThemedText'
import { useTranslation } from 'react-i18next'
import { FlatList, View, StyleSheet } from 'react-native'
import MotorbikeIcon from '@/assets/icons/MotorbikeIcon'
import EngineIcon from '@/assets/icons/EngineIcon'
import KartingIcon from '@/assets/icons/KartingIcon'
import CarIcon from '@/assets/icons/CarIcon'
import UnitPieceIcon from '@/assets/icons/UnitPieceIcon'
import EquipmentIcon from '@/assets/icons/EquipmentIcon'
import AccesoriesIcon from '@/assets/icons/AccesoriesIcon'
import ToolsIcon from '@/assets/icons/ToolsIcon'
import ServicesIcon from '@/assets/icons/ServicesIcon'

const CategoriesList = () => {
  const { t } = useTranslation()
  const categories = [
    { id: '1', name: 'Motos', Icon: <MotorbikeIcon /> },
    { id: '2', name: 'Kartings', Icon: <KartingIcon /> },
    { id: '3', name: 'Autos', Icon: <CarIcon /> },
    { id: '4', name: 'Piezas de motor', Icon: <EngineIcon /> },
    { id: '5', name: 'Piezas de unidad', Icon: <UnitPieceIcon /> },
    { id: '6', name: 'Equipamiento', Icon: <EquipmentIcon /> },
    { id: '7', name: 'Accesorios', Icon: <AccesoriesIcon /> },
    { id: '8', name: 'Herramientas', Icon: <ToolsIcon /> },
    { id: '9', name: 'Servicios', Icon: <ServicesIcon /> },
  ]

  return (
    <View>
      <ThemedText type="title">{t('categories')}</ThemedText>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={styles.iconContainer}>{item.Icon}</View>
            <ThemedText type="categoryIcon">{item.name}</ThemedText>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    width: 85,
    height: 85,
  },
  iconContainer: {
    width: 40,
    padding: 5,
    backgroundColor: '#E9FFF8',
    borderRadius: 8,
  },
  listContainer: {
    paddingVertical: 12,
  },
})

export default CategoriesList
