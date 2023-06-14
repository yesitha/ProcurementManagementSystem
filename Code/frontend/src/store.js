import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import baseReducer from './reducers/baseReducer'

export const store = configureStore({
  reducer: {
      auth: authReducer,
      base: baseReducer,
  },
})