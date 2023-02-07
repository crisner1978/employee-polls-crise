import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { _getUsers } from '../utils/_DATA'

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { payload } = action
      Object.entries(state.entities).forEach(([key, value]) => {
        if (value.name === payload.author) {
          value.questions.push(payload.id)
        }
      })
    },
    saveAnswer: (state, { payload }) => {
      const { qid, answer } = payload
      Object.entries(state.entities).forEach(([key, value]) => {
        if (value.id === payload.authedUser) {
          value.answers[qid] = answer
        }
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
)
export const { updateUser, saveAnswer } = usersSlice.actions
export default usersSlice.reducer

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await _getUsers()
  return response
})
