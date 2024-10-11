import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'
import NotificationIcon from '@/assets/icons/NotificationIcon'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import BottomSheetDrawer from '../BottomSheetDrawer'
import { CheckBox } from '@rneui/themed'
import { useThemeColor } from '@/hooks/useThemeColor'
import { competitionCategories } from '@/constants/Categories'
import { useUpdateUser } from '@/state/api/userApi'
import { TFunction } from 'i18next'

interface TopBarProps {
  selectedCompetition: string
  setSelectedCompetition: (option: string) => void
  setCursor: (cursor: string | null) => void
  uid: string
  t: TFunction
  setSearch: (search: string) => void
}

const TopBar = ({
  setSelectedCompetition,
  selectedCompetition,
  setCursor,
  uid,
  t,
  setSearch,
}: TopBarProps) => {
  const { updateUserData } = useUpdateUser()
  const [isVisible, setIsVisible] = useState(false)
  const tint = useThemeColor({}, 'tint')

  // Aquí están las opciones con label y value

  const onHandleOpenSheet = () => {
    setCursor(null)
    setIsVisible(true)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const onHandleSelectOption = (optionValue: string) => {
    updateUserData({
      id: uid,
      favoriteCompetition: optionValue,
    })
    setSelectedCompetition(optionValue)
    setSearch('')
    setTimeout(() => {
      handleClose()
    }, 300)
  }

  return (
    <View style={styles.container}>
      <View>
        <BottomSheetDrawer
          isVisible={isVisible}
          handleClose={handleClose}
          height={0.4}
        >
          {competitionCategories.map((option) => (
            <CheckBox
              key={option.value}
              title={option.label}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedCompetition === option.value} // Compare with value
              onPress={() => onHandleSelectOption(option.value)} // Pass value to handler
              checkedColor={tint as string}
              textStyle={styles.checkBoxText}
              containerStyle={styles.checkBoxContainer}
            />
          ))}
        </BottomSheetDrawer>
        <ThemedText type="small" style={{ color: '#C8C8CB' }}>
          {t('competition')}
        </ThemedText>
        <TouchableOpacity
          style={styles.competitionContainer}
          onPress={onHandleOpenSheet}
        >
          <ThemedText style={{ fontWeight: 500 }}>
            {
              competitionCategories.find(
                (option) => option.value === selectedCompetition,
              )?.label
            }
            {/* Display the label corresponding to the selected value */}
          </ThemedText>
          <ArrowDownIcon />
        </TouchableOpacity>
      </View>
      <NotificationIcon />
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 16,
  },
  competitionContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  checkBoxText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
  },
})
