import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' // Asegúrate de instalar react-native-vector-icons
import { ThemedText } from './ThemedText'
import EyeClosedIcon from '@/assets/icons/EyeCloseIcon'
import EyeOpenIcon from '@/assets/icons/EyeOpenIcon'

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
  secureTextEntry = false,
  error,
  iconName,
}: CustomTextInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry)

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
          style={[
            styles.input,
            iconName ? { paddingLeft: 40 } : null,
            secureTextEntry ? { paddingRight: 40 } : null,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible && secureTextEntry} // Utiliza el estado local para controlar la visibilidad
          placeholderTextColor={'white'}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIconContainer}
          >
            {/* {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />} */}
            <Icon
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        )}
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
    fontSize: 14,
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
    top: 10,
    left: 10,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10, // Posición del ícono del ojo a la derecha del input
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
})

export default CustomTextInput
