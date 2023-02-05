import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import questionsReducer from '../features/questionsSlice'
import usersReducer from '../features/usersSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    questions: questionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
