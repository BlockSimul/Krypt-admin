import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { index } from "./userAPI";

const initialState = {
  users: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getUsers = createAsyncThunk("user/index", async (thunkAPI) => {
  try {
    return await index();
  } catch (e) {
    const errMessage =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    return thunkAPI.rejectWithValue(errMessage);
  }
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
