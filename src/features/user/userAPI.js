import axios from "axios";

export const index = async () => {
  const trxns = await axios.get(
    "https://krypt-wallet.onrender.com/users"
  );
  return trxns.data;
};
