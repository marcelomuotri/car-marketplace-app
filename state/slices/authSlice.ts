// Importaciones necesarias
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, UserData } from '../../types'
// Importa los tipos definidos

// Estado inicial de la autenticación
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  userData: null,
}

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null
      state.loading = false
      state.error = action.payload
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: string; userData: UserData }>,
    ) {
      //TODO remove any
      state.user = action.payload.user
      state.userData = action.payload.userData
      state.loading = false
      state.error = null
    },
    loginLoading(state) {
      state.loading = true
    },
    logoutSuccess(state) {
      state.user = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {},
})

export const { loginFailure, loginSuccess, logoutSuccess, loginLoading } =
  authSlice.actions
// Exporta el reducer de la slice
export const authReducer = authSlice.reducer
