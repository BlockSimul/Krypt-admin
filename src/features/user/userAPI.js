import axios from "axios";

export const index = async () => {
  const trxns = await axios.get(
    "https://blocksimul-backend.onrender.com/users"
  );
  return trxns.data;
};
