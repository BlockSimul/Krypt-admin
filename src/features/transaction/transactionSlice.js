import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  confirmTransaction,
  createTransaction,
  index,
  pkTransaction,
  validatPk,
} from "./transactionAPI";

const initialState = {
  transactions: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getTrnx = createAsyncThunk(
  "transaction/index",
  async (thunkAPI) => {
    try {
      return await index();
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for creating a transaction
export const newTransaction = createAsyncThunk(
  "transaction/create",
  async (transaction, thunkAPI) => {
    try {
      return await createTransaction(transaction, "");
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for confirming a transaction
export const confirmTrnx = createAsyncThunk(
  "transaction/confirm",
  async (transaction, thunkAPI) => {
    try {
      return await confirmTransaction(transaction, "");
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for confirming a transaction
export const valPk = createAsyncThunk(
  "transaction/validate",
  async (transaction, thunkAPI) => {
    try {
      return await validatPk(transaction, "");
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for creating a pk transaction
export const pkTrnx = createAsyncThunk(
  "transaction/pk",
  async (transaction, thunkAPI) => {
    try {
      return await pkTransaction(transaction, "");
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
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
      .addCase(getTrnx.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrnx.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(getTrnx.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(newTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(newTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tx = null;
      })
      .addCase(confirmTrnx.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmTrnx.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(confirmTrnx.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tx = null;
      })
      .addCase(valPk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(valPk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(valPk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(pkTrnx.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pkTrnx.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(pkTrnx.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tx = null;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
