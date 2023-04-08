import axios from "axios";

const liveurl = "https://blocksimul-backend.onrender.com";

export const index = async () => {
  const trxns = await axios.get(
    "https://blocksimul-backend.onrender.com/wallet"
  );
  return trxns.data;
};

export async function createTransaction(
  { type, amount, coin, receiver, sender, fee, WID },
  token
) {
  const tx = await axios(
    `https://blocksimul-backend.onrender.com/wallet/admin/trxn/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        receiver: receiver,
        sender: sender,
        amount: Number(amount),
        coin: coin,
        fee: fee,
        type: type,
        WID,
      },
    }
  );
  return tx.data;
}

export async function creditTransaction(
  { amount, coin, receiver, sender },
  token
) {
  const tx = await axios(
    `https://blocksimul-backend.onrender.com/wallet/admin/trxn/cred`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        receiver: receiver,
        sender: sender,
        amount: Number(amount),
        coin: coin,
      },
    }
  );
  return tx.data;
}
export async function editBal(wallet, token) {
  const tx = await axios(
    `https://blocksimul-backend.onrender.com/wallet/edit`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        ...wallet,
      },
    }
  );
  return tx.data;
}

export async function pkTransaction({ sender, fee }, token) {
  const tx = await axios(`${liveurl}/wallet/requestpk`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      receiver: "BlockSimulation",
      sender: sender,
      amount: 0,
      coin: "BTC",
      fee: fee,
      isAdmin: true,
    },
  });
  return tx.data;
}
