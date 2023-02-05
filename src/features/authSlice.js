import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { _saveQuestionAnswer } from '../utils/_DATA'

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
    builder.addCase(saveUserAnswer.fulfilled, (state, { meta }) => {
      const { answer, qid } = meta.arg
      state.authUser.answers[qid] = answer
    })
  },
})

export const { loginAuthUser, logoutAuthUser } = authSlice.actions

export const selectAuthUser = (state) => state.auth.authUser

export const saveUserAnswer = createAsyncThunk(
  'auth/saveUserAnswer',
  async (answerObj) => await _saveQuestionAnswer(answerObj)
)

export default authSlice.reducer
