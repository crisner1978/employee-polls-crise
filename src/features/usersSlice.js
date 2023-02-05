import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { _getUsers } from '../utils/_DATA'


const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
)

export default usersSlice.reducer

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await _getUsers()
  return response
})
