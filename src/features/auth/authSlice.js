import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSet, login, setSettings, signup } from "./authAPI";

const initialState = {
  admin: null,
  setting: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/signup",
  async (admin, thunkAPI) => {
    try {
      return await signup(admin);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const auth = createAsyncThunk("auth/login", async (admin, thunkAPI) => {
  try {
    return await login(admin);
  } catch (e) {
    const errMessage =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    return thunkAPI.rejectWithValue(errMessage);
  }
});

export const configure = createAsyncThunk(
  "auth/setsettings",
  async (setting, thunkAPI) => {
    try {
      return await setSettings(setting);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const getSettings = createAsyncThunk(
  "auth/getsettings",
  async (setting, thunkAPI) => {
    try {
      return await getSet(setting);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(auth.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(configure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(configure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(configure.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.setting = action.payload[0];
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setAdmin } = authSlice.actions;
export default authSlice.reducer;
