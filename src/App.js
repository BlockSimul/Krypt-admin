import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";
import DashScreen from "./components/DashScreen";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import RequestPk from "./pages/RequestPk";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<DashScreen />} />
          <Route path="request pk" element={<RequestPk />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="users" element={<Users />} />
          <Route path="wallets" element={<Wallets />} />
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
