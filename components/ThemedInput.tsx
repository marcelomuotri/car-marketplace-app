import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native'
import { Input } from '@rneui/themed'
import { ThemedText } from './ThemedText'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon'

interface ThemedInputProps {
  type: 'text' | 'select'
  value: any
  onChange: (value: string) => void
  options?: { label: string; value: string }[]
  placeholder?: string
  label?: string
  title?: string
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  type,
  value,
  onChange,
  options = [],
  placeholder,
  label,
  title,
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleSelect = (itemValue: string) => {
    onChange(itemValue)
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      {title && <ThemedText type="title">{title}</ThemedText>}
      {type === 'text' && (
        <Input
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          containerStyle={styles.inputContainer}
        />
      )}

      {type === 'select' && (
        <>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText
              type="title"
              style={{
                fontWeight: 400,
                color: value ? '#000' : '#999',
              }}
            >
              {value?.label || placeholder}
            </ThemedText>
            <ArrowDownIcon />
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.modalItem}
                      onPress={() => handleSelect(option.value)}
                    >
                      <Text style={styles.modalItemText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    gap: 8,
  },
  inputContainer: {
    width: '100%',
  },
  selectButton: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  scrollView: {
    paddingVertical: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ThemedInput
