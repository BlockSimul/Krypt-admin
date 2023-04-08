// import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SidebarWithHeader from "../components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getWallet } from "../features/wallet/walletSlice";
import { getTrnx } from "../features/transaction/transactionSlice";
import { getUsers } from "../features/user/userSlice";
import { getSettings, setAdmin } from "../features/auth/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Check for Auth
  useEffect(() => {
    const admin = localStorage.getItem("BSadminTokens");
    if (!admin) {
      navigate("/login");
    } else {
      dispatch(setAdmin(admin));
    }
  }, [dispatch, navigate]);

  //Get everything
  useEffect(() => {
    const admin = localStorage.getItem("BSadminTokens");
    if (admin) {
      dispatch(getWallet());
      dispatch(getTrnx());
      dispatch(getUsers());
      dispatch(getSettings());
    }
  }, [dispatch]);

  return (
    <SidebarWithHeader>
      <Outlet />
    </SidebarWithHeader>
  );
}

export default Dashboard;
