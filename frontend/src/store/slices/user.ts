import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthClient } from "@/shared/apis/authClient";
import { TypeUser } from "@/shared/lib/types/authTypes";

const authClient = new AuthClient();

type UserSliceState = {
  role: string;
  user: TypeUser | null;
  error: any;
  userAuthenticated: boolean;
};

export const fetchMe: any = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authClient.getMe();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

const initialState: UserSliceState = {
  role: "",
  user: null,
  error: null,
  userAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      Object.assign(state, initialState);
    },
    chooseRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action?.payload;
      state.role = action?.payload.user_type;
      state.error = false;
      state.userAuthenticated = true;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.error = action.payload;
      state.userAuthenticated = false;
    });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { logOut, chooseRole } = actions;
// Export the reducer, either as a default or named export
export default reducer;
