import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'
import FilterIcon from '@/assets/icons/FilterIcon'

interface FilterButtonProps {
  title: string
  filtersApplied?: number
  onPress?: () => void
}

const FilterButton = ({
  title,
  filtersApplied = 0,
  onPress,
}: FilterButtonProps) => {
  const FilterButtonBorderColor = useThemeColor({}, 'borderFilterButton')
  const FilterButtonSelectedColor = useThemeColor({}, 'selectedFilterButton')
  const TintColor = useThemeColor({}, 'tint')

  // Crea un estilo usando una función que recibe el color como argumento
  const styles = createStyles(
    FilterButtonBorderColor as string,
    FilterButtonSelectedColor as string,
    TintColor as string,
    filtersApplied > 0,
  )

  return (
    <TouchableOpacity style={styles.headerButton} onPress={onPress}>
      <ThemedText style={styles.filterButtonTitle} type="default">
        {title}
      </ThemedText>
      {filtersApplied > 0 ? (
        <View style={styles.filterCountContainer}>
          <ThemedText style={styles.filterCount}>{filtersApplied}</ThemedText>
        </View>
      ) : (
        <FilterIcon />
      )}
    </TouchableOpacity>
  )
}

const createStyles = (
  FilterButtonBorderColor: string,
  FilterButtonSelectedColor: string,
  TintColor: string,
  isSelected: boolean,
) => {
  return StyleSheet.create({
    headerButton: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: FilterButtonBorderColor,
      paddingLeft: 6,
      paddingRight: 6,
      paddingBottom: 4,
      paddingTop: 4,
      flexDirection: 'row',
      gap: 7,
      alignItems: 'center',
      backgroundColor: isSelected ? FilterButtonSelectedColor : 'transparent',
    },
    filterButtonTitle: {
      fontSize: 12,
    },
    filterCountContainer: {
      backgroundColor: TintColor,
      borderRadius: 12,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterCount: {
      fontSize: 12,
      color: '#fff',
      fontWeight: '700',
    },
  })
}

export default FilterButton
