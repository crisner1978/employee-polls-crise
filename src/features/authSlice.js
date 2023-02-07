import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { _saveQuestionAnswer } from '../utils/_DATA'
import { saveAnswer, updateUser } from './usersSlice'

const initialState = {
  authUser: null,
  status: 'idle',
  users: null,
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
    builder
      .addCase(saveUserAnswer.pending, (state, { meta }) => {
        if (state.status === 'idle') {
          state.status = 'pending'
        }
        const { answer, qid } = meta.arg
        state.authUser.answers[qid] = answer
      })
      .addCase(saveUserAnswer.fulfilled, (state, {payload}) => {
        if (state.requestStatus === 'fullfilled') {
          state.status = 'idle'
          state.authUser.answers[payload.qid] = payload.answer
        }
      })
    builder
      .addCase(createQuestion.pending, (state, { meta, payload, type }) => {
        if (state.status === 'idle') {
          state.status = 'pending'
          state.authUser.questions.push(meta.arg.id)
        }
      })
      .addCase(createQuestion.fulfilled, (state, { meta, payload, type }) => {
        if (state.status === 'pending') {
          state.status = 'idle'
          state.authUser.questions.push(meta.arg.id)
        }
      })
  },
})

export const { loginAuthUser, logoutAuthUser } = authSlice.actions

export const selectAuthUser = (state) => state.auth.authUser

export const saveUserAnswer = createAsyncThunk(
  'auth/saveUserAnswer',
  async (answerObj, thunkAPI) => {
    const response = await _saveQuestionAnswer(answerObj).then((res) =>
      thunkAPI.dispatch(saveAnswer(answerObj))
    )
    return response
  }
)

export const createQuestion = createAsyncThunk(
  'auth/createQuestion',
  async (question, thunkAPI) => {
    const response = await thunkAPI.dispatch(updateUser(question)).then((res) => res.payload)
    return response
  }
)

export default authSlice.reducer
