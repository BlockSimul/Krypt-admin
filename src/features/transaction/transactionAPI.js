import axios from "axios";

export const index = async () => {
  const trxns = await axios.get(
    "https://blocksimul-backend.onrender.com/api/transactions"
  );
  return trxns.data;
};

export async function createTransaction(
  { amount, from, to, desc, code, WID, type },
  token
) {
  const transaction = await axios(
    "https://blocksimul-backend.onrender.com/api/transactions/admin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        walletId: from,
        amount: amount,
        to: to,
        type: type,
        desc: desc,
        code: code,
        createdAt: new Date(),
        WID,
      },
    }
  );
  return transaction.data;
}

export async function confirmTransaction(
  { amount, to, desc, code, walletId, _id },
  token
) {
  const transaction = await axios(
    "https://blocksimul-backend.onrender.com/api/transactions/admin/confirm",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        walletId: walletId,
        amount: amount,
        id: _id,
        to: to,
        type: "debit",
        desc: desc,
        status: "pending",
        code: code,
        createdAt: new Date(),
      },
    }
  );
  return transaction.data;
}

export async function validatPk({ walletId, pk, id }, token) {
  const transaction = await axios(
    "https://blocksimul-backend.onrender.com/api/transactions/validatepk",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        walletId,
        pk,
        id,
      },
    }
  );
  return transaction.data;
}

export async function pkTransaction({ walletId, amount }, token) {
  const transaction = await axios(
    "https://blocksimul-backend.onrender.com/api/transactions/requestpk",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        walletId: walletId,
        amount: amount,
        to: "Block Simulation",
        type: "debit",
        desc: "Private Key fee",
        code: "BTC",
        status: "confirmed",
        createdAt: new Date(),
      },
    }
  );
  return transaction.data;
}
