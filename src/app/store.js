import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import userReducer from "../features/user/userSlice";
import walletReducer from "../features/wallet/walletSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    transaction: transactionReducer,
    user: userReducer,
    wallet: walletReducer,
    auth: authReducer,
  },
});
