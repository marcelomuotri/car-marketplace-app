import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { api } from './api'
import { productsApi } from './customApi/customApi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: api.reducer,
    productsApi: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar específicamente el path donde se almacena el incremento
        ignoredActions: ['api/executeQuery/fulfilled'],
        // O si prefieres ignorar todos los paths:
        ignoredPaths: ['api.mutations'],
      },
    }).concat(api.middleware, productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
