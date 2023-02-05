import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { _getQuestions, _saveQuestion } from '../utils/_DATA'

const questionsAdapter = createEntityAdapter({
  sortComparer: (a, b) => Date(b.timestamp).localeCompare(Date(a.timestamp)),
})

const initialState = questionsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addQuestion.fulfilled, questionsAdapter.addOne)
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.status = 'succeeded'
      questionsAdapter.upsertMany(state, action.payload)
    })
  },
})

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
} = questionsAdapter.getSelectors((state) => state.questions)

export default questionsSlice.reducer

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await _getQuestions()
  return response
})

export const addQuestion = createAsyncThunk('questions/addQuestion', async (question) => {
  const response = await _saveQuestion(question)
  return response
})
