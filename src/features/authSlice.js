import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { saveQuestionAnswer } from '../lib/saveQuestionAnswer'

const initialState = {
  authUser: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAuthUser: (state, { payload }) => {
      state.authUser = payload
    },
    logoutAuthUser: (state) => {
      state.authUser = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUserAnswer.fulfilled, (state, { payload }) => {
      const { answers } = payload
      state.authUser.answers = answers
    })
  },
})
export const logoutRedux = createAction('auth/logout')
export const { loginAuthUser, logoutAuthUser } = authSlice.actions

export const selectAuthUser = (state) => state.auth.authUser

export const saveUserAnswer = createAsyncThunk('auth/saveUserAnswer', async (answerObj) => {
  const { user } = await saveQuestionAnswer(answerObj)
  return user
})

export default authSlice.reducer
