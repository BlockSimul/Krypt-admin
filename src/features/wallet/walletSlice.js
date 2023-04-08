import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  creditTransaction,
  editBal,
  index,
  pkTransaction,
} from "./walletAPI";

const initialState = {
  wallets: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getWallet = createAsyncThunk("wallet/index", async (thunkAPI) => {
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

//for transaction in wallet
export const txWallet = createAsyncThunk(
  "wallet/txwallet",
  async ({ info, user }, thunkAPI) => {
    try {
      return await createTransaction(info, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for credit transaction in wallet
export const creditWallet = createAsyncThunk(
  "wallet/creditwallet",
  async ({ info, user }, thunkAPI) => {
    try {
      return await creditTransaction(info, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for credit transaction in wallet
export const EditBal = createAsyncThunk(
  "wallet/edit",
  async (info, thunkAPI) => {
    try {
      return await editBal(info, "");
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const pkWallet = createAsyncThunk(
  "wallet/pkwallet",
  async ({ info, user }, thunkAPI) => {
    try {
      return await pkTransaction(info, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
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
      .addCase(getWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wallets = action.payload;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(txWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(txWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(txWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(creditWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creditWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(creditWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(EditBal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditBal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(EditBal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(pkWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pkWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(pkWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
