import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuthService } from '@/state/services/authService'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import ThemedTextInput from '../components/ThemedTextInput'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import Loader from '@/components/Loader'

interface SignUpFieldsForm {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFieldsForm>()
  const { createUser } = useAuthService()
  const { loading } = useSelector((state: RootState) => state.auth)
  // const [form, setForm] = useState({
  //   name: '',
  //   surname: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // })
  useAuthRedirect()

  const handleCreateAccount: SubmitHandler<SignUpFieldsForm> = async (data) => {
    console.log(data)
    const { name, surname, email, password, confirmPassword } = data
    //const { name, surname, email, password, confirmPassword } = form
    if (password !== confirmPassword) {
      return alert('Passwords do not match')
    }
    createUser({ email, password })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <View style={styles.headerBack}></View>

            <Text style={styles.title}>Let's Get Started!</Text>

            <Text style={styles.subtitle}>
              Fill in the fields below to get started with your new account.
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}></View>

            <View style={styles.input}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'invalid email address',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    label="Email Address"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email"
                    error={errors.email}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    label="Password"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Password"
                    secureTextEntry
                    error={errors.password}
                  />
                )}
              />
            </View>

            <View style={styles.input}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    label="Password"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Confirm password"
                    secureTextEntry
                    error={errors.confirmPassword}
                  />
                )}
              />
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit(handleCreateAccount)}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Get Started</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => {
            // handle link
          }}
          style={{ marginTop: 'auto' }}
        >
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
        {loading && <Loader />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
})
