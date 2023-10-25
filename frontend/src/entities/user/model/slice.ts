import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '@/shared/api/gen'
import { $apiAccountsApi } from '@/shared/api'
import { removeFieldsFromLocalStorage } from '@/shared/lib/hooks/useLocalStorage'

type UserSliceState = {
  role: string
  user: User | null
  error: unknown
  userAuthenticated: boolean
}

export const fetchMe = createAsyncThunk('user/get', async (_, { rejectWithValue }) => {
  try {
    const { data } = await $apiAccountsApi.accountsUsersMeRead()
    // todo исправить позже как поменяют бэк
    return data as unknown as User
  } catch (error: any) {
    return rejectWithValue(error.response.status)
  }
})

const initialState: UserSliceState = {
  role: '',
  user: null,
  error: null,
  userAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      Object.assign(state, initialState)
      removeFieldsFromLocalStorage(['access_token', 'refresh_token'])
    },
    chooseRole(state, action: PayloadAction<string>) {
      state.role = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action?.payload
      state.role = action?.payload.type
      state.error = false
      state.userAuthenticated = true
    })
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.error = action.payload
      state.userAuthenticated = false
    })
  },
})

export const { actions, reducer } = userSlice
export const { logOut, chooseRole } = actions
