import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Input, ListItem } from '@rneui/base'
import BottomSheetDrawer from '../BottomSheetDrawer'
import SearchIcon from '@/assets/icons/SearchIcon'
import { capitalizeFirstLetter } from '@/components/utils/formatter'
import { ProductListProps } from '@/types'

interface SearchDrawerProps {
  isSearchDrawerOpen: boolean
  setIsSearchDrawerOpen: (value: boolean) => void
  setSearch: (value: string) => void
  search: string
  products: ProductListProps[]
  goToIdPage: (id: string) => void
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isSearchDrawerOpen,
  setIsSearchDrawerOpen,
  setSearch,
  search,
  products,
  goToIdPage,
}) => {
  return (
    <BottomSheetDrawer
      isVisible={isSearchDrawerOpen}
      handleClose={() => setIsSearchDrawerOpen(false)}
      height={0.94}
    >
      <Input
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        placeholder="Buscar"
        leftIcon={<SearchIcon />}
        leftIconContainerStyle={{ marginRight: 15 }}
        onChangeText={(text) => setSearch(text)}
        value={search}
        onSubmitEditing={() => setIsSearchDrawerOpen(false)}
      />
      <ScrollView>
        {products.map((item) => (
          <ListItem key={item.id} onPress={() => goToIdPage(item.id)}>
            <ListItem.Content>
              <ListItem.Title>
                {capitalizeFirstLetter(item.title)}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </BottomSheetDrawer>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#F0F2F1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
  },
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: -30,
  },
  inputStyle: {
    color: '#C8C8CB',
    fontSize: 14,
  },
})

export default SearchDrawer
