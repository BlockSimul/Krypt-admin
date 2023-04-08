import axios from "axios";

export const signup = async (admin) => {
  const newAdmin = await axios({
    url: "https://blocksimul-backend.onrender.com/admin/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...admin,
    },
  });
  localStorage.setItem("BSadminTokens", newAdmin.data);
  return newAdmin.data;
};

export const login = async (admin) => {
  const newAdmin = await axios({
    url: "https://blocksimul-backend.onrender.com/admin/auth",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...admin,
    },
  });
  localStorage.setItem("BSadminTokens", newAdmin.data);
  return newAdmin.data;
};

export const setSettings = async (settings) => {
  const set = await axios({
    url: "https://blocksimul-backend.onrender.com/admin/settings",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ...settings,
    },
  });

  return set.data;
};

export const getSet = async () => {
  const newAdmin = await axios({
    url: "https://blocksimul-backend.onrender.com/admin/settings",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return newAdmin.data;
};
