import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' // Asegúrate de instalar react-native-vector-icons
import { ThemedText } from './ThemedText'

interface CustomTextInputProps {
  label: string
  onChangeText: (text: string) => void
  value: string | undefined
  placeholder: string
  secureTextEntry?: boolean
  error?: any
  type?: string
  iconName?: string // Nueva propiedad para el nombre del ícono
}

const CustomTextInput = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  error,
  iconName,
}: CustomTextInputProps) => {
  const getErrorMessage = (type: string) => {
    let errorMessage = ''
    switch (type) {
      case 'required':
        errorMessage = 'Este campo es obligatorio'
        break
      case 'minLength':
        errorMessage = 'Debe tener más de 6 caracteres'
        break
      case 'maxLength':
        errorMessage = 'Debe tener menos de 20 caracteres'
        break
      default:
        errorMessage = 'Error desconocido'
    }
    return errorMessage
  }

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText style={styles.label} type="defaultSemiBold">
          {label}
        </ThemedText>
      )}
      <View style={styles.inputContainer}>
        {iconName && (
          <Icon name={iconName} size={20} color="#C9D3DB" style={styles.icon} />
        )}
        <TextInput
          allowFontScaling={false}
          style={[styles.input, iconName ? { paddingLeft: 40 } : null]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={'white'}
        />
      </View>
      {error && (
        <Text style={styles.errorText}>
          {error.message ? error.message : getErrorMessage(error.type)}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 17,
    color: '#FFF',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 40,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '500',
    borderWidth: 1.5,
    borderColor: '#FFF',
    borderStyle: 'solid',
    color: '#FFF',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
})

export default CustomTextInput
