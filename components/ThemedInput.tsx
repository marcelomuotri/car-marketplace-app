import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { CheckBox, Input } from '@rneui/themed'
import { Controller, Control } from 'react-hook-form'
import { ThemedText } from './ThemedText'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'
import { capitalizeFirstLetter } from './utils/formatter'
import Icon from 'react-native-vector-icons/FontAwesome'

interface ThemedInputProps {
  name: string
  control: Control<any>
  label?: string
  type:
    | 'text'
    | 'select'
    | 'number'
    | 'phone'
    | 'password'
    | 'radio'
    | 'multiOption'
    | 'checkbox'

  placeholder?: string
  options?: { label: string; value: string }[]
  defaultValue?: any
  numberOfLines?: number
  checkedLabel?: string
  uncheckedLabel?: string
}

const ThinCircle = ({ isChecked }) => (
  <View style={[styles.circle, isChecked && styles.checkedCircle]} />
)

const ThemedInput: React.FC<ThemedInputProps> = ({
  name,
  control,
  label,
  type,
  placeholder,
  options = [],
  defaultValue,
  numberOfLines,
  checkedLabel = 'SI', // Valor por defecto si está marcado
  uncheckedLabel = 'NO', // Valor por defecto si no está marcado
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={{ gap: 8 }}>
      {label && <ThemedText type="title">{label}</ThemedText>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
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
                  inputStyle={[
                    styles.inputStyle,
                    !!numberOfLines && styles.multilineInputStyle,
                  ]}
                  multiline={!!numberOfLines}
                  numberOfLines={numberOfLines}
                />
              )
            case 'select':
              // Derivar la etiqueta a mostrar de field.value
              const selectedOption = options.find(
                (option) =>
                  option.label?.toLowerCase() === field.value?.toLowerCase(),
              )
              const displayedLabel = selectedOption
                ? selectedOption.label
                : placeholder || ''

              return (
                <>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.selectButton}
                  >
                    <ThemedText style={styles.labelText}>
                      {capitalizeFirstLetter(displayedLabel)}
                    </ThemedText>
                    <ArrowDownIcon />
                  </TouchableOpacity>
                  <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => setModalVisible(false)}
                    >
                      <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                          <View style={styles.modalContent}>
                            <ScrollView>
                              {options.map((option) => (
                                <TouchableOpacity
                                  key={option.value}
                                  onPress={() => {
                                    field.onChange(option.value)
                                    setModalVisible(false)
                                  }}
                                  style={styles.optionItem}
                                >
                                  <Text>
                                    {capitalizeFirstLetter(option.label)}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </ScrollView>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                </>
              )
            case 'radio':
              return (
                <View style={styles.radioGroup}>
                  {options.map((option) => (
                    <CheckBox
                      key={option.value}
                      title={option.label}
                      checked={field.value === option.value}
                      onPress={() => field.onChange(option.value)}
                      containerStyle={styles.radioButtonContainer}
                      textStyle={styles.radioText}
                      checkedIcon={<ThinCircle isChecked />}
                      uncheckedIcon={<ThinCircle isChecked={false} />}
                    />
                  ))}
                </View>
              )
            case 'multiOption':
              return (
                <View style={styles.sizeContainer}>
                  {options.map((option) => {
                    const isSelected = field.value?.includes(option.value)

                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => {
                          // Si ya está seleccionada, la quitamos; si no, la agregamos
                          if (isSelected) {
                            field.onChange(
                              field.value.filter(
                                (item) => item !== option.value,
                              ),
                            )
                          } else {
                            field.onChange([
                              ...(field.value || []),
                              option.value,
                            ])
                          }
                        }}
                        style={[
                          styles.sizeOption,
                          isSelected && styles.selectedSizeOption, // Cambiar el estilo si está seleccionado
                        ]}
                      >
                        <Text
                          style={[
                            styles.sizeText,
                            isSelected && styles.selectedSizeText,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )
            case 'checkbox':
              return (
                <CheckBox
                  title={placeholder}
                  checked={field.value === checkedLabel}
                  onPress={() => {
                    field.onChange(
                      field.value === checkedLabel
                        ? uncheckedLabel
                        : checkedLabel,
                    )
                  }}
                  containerStyle={styles.radioButtonContainer}
                  textStyle={{ fontWeight: 400 }}
                  checkedColor="#3D9970"
                />
              )
            default:
              return null
          }
        }}
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
    width: '90%',
    maxHeight: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  optionItem: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  labelText: {
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 50,
    borderBottomWidth: 1,
    paddingBottom: 24,
    borderColor: '#E3E3E3',
  },
  radioButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  radioText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: 400,
  },
  circle: {
    width: 20, // Ajusta el tamaño del círculo
    height: 20,
    borderRadius: 10, // Para que sea un círculo
    borderWidth: 2, // Ajusta el grosor del borde
    borderColor: '#757575', // Color del borde
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    backgroundColor: '#757575',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#F0F2F1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },
  selectedSizeOption: {
    backgroundColor: '#E9FFF8', // Color para la opción seleccionada
  },
  sizeText: {
    fontSize: 12,
    color: '#333',
  },
  selectedSizeText: {
    color: '#00796B', // Color del texto cuando está seleccionado
  },
})

export default ThemedInput
