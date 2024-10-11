import React from 'react'
import { View, StyleSheet } from 'react-native'

import { TFunction } from 'i18next'
import BottomSheetDrawer from '../BottomSheetDrawer'
import { ListItem } from '@rneui/base'
import { capitalizeFirstLetter } from '../utils/formatter'
import { MaterialIcons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'

interface FiltersModalProps {
  isVisible: boolean
  toggleModal: () => void
  t: TFunction
  setSortBy: (value: string) => void
  sortBy: string
}

const SorterModal = ({
  isVisible,
  toggleModal,
  setSortBy,
  t,
  sortBy,
}: FiltersModalProps) => {
  const tint = useThemeColor({}, 'tint')

  const sorterOptions = [
    { label: 'Más caro a más barato', value: 'desc' },
    { label: 'Más barato a más caro', value: 'asc' },
  ]

  const onCancelAndCloseModal = () => {
    toggleModal()
    //reset()
  }

  const onPressOption = (value: string) => {
    setSortBy(value)
    toggleModal()
  }

  return (
    <BottomSheetDrawer
      isVisible={isVisible}
      handleClose={onCancelAndCloseModal}
      header={t('sort')}
    >
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          {sorterOptions.map((option) => {
            const isSelected = option.value === sortBy
            return (
              <ListItem
                key={option.label}
                onPress={() => onPressOption(option.value)}
                bottomDivider
              >
                <ListItem.Content>
                  <View style={styles.optionContainer}>
                    {isSelected && (
                      <MaterialIcons
                        name="check"
                        size={20}
                        color={tint as string}
                        style={styles.checkIcon}
                      />
                    )}
                    <ListItem.Title>
                      {capitalizeFirstLetter(option.label)}
                    </ListItem.Title>
                  </View>
                </ListItem.Content>
              </ListItem>
            )
          })}
        </View>
      </View>
    </BottomSheetDrawer>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    paddingVertical: 20,
  },
  inputContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 8,
  },
})

export default SorterModal
