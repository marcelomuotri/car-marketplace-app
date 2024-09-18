import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native'
import { Input } from '@rneui/themed'
import { Controller, Control } from 'react-hook-form'
import { ThemedText } from './ThemedText'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'

interface ThemedInputProps {
  name: string
  control: Control<any>
  label?: string
  type: 'text' | 'select' | 'number' | 'phone' | 'password'
  placeholder?: string
  options?: { label: string; value: string }[]
  defaultValue?: any
  numberOfLines?: number
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  name,
  control,
  label,
  type,
  placeholder,
  options = [],
  defaultValue,
  numberOfLines,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined,
  )

  const renderInputField = ({ field }: any) => {
    switch (type) {
      case 'text':
      case 'number':
      case 'phone':
      case 'password':
        return (
          <Input
            placeholder={placeholder}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            secureTextEntry={type === 'password'}
            keyboardType={
              type === 'number'
                ? 'numeric'
                : type === 'phone'
                  ? 'phone-pad'
                  : 'default'
            }
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            //inputStyle={styles.inputStyle}
            inputStyle={[
              styles.inputStyle,
              !!numberOfLines && styles.multilineInputStyle,
            ]}
            multiline={!!numberOfLines}
            numberOfLines={numberOfLines}
          />
        )
      case 'select':
        return (
          <>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.selectButton}
            >
              <ThemedText style={styles.labelText}>
                {field.value || selectedLabel || placeholder}
              </ThemedText>
              <ArrowDownIcon />
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <ScrollView>
                    {options.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => {
                          setSelectedLabel(option.label) // Muestra el label en la interfaz
                          field.onChange(option.value) // Guarda el value en la base de datos
                          setModalVisible(false)
                        }}
                        style={styles.optionItem}
                      >
                        <Text>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </>
        )
      default:
        return null
    }
  }

  return (
    <View style={{ gap: 8 }}>
      {label && <ThemedText type="title">{label}</ThemedText>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={renderInputField}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    paddingHorizontal: 5,
  },
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: -30,
  },
  inputStyle: {
    color: '#393F42',
    fontSize: 14,
  },
  multilineInputStyle: {
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '60%',
    maxHeight: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  labelText: {
    color: '#333',
  },
})

export default ThemedInput
