import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";

import PersistLogin from "./components/PersistLogin";
import ResetPassword from "./components/ResetPassword";
import AccountLocked from "./components/AccountLocked";
import UserProfile from "./components/UserProfile";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <>
      <Routes>
        {/*Public routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/locked-account" element={<AccountLocked />} />

        {/*  PRIVATE ROUTES*/}
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path="/me/:name" element={<Dashboard />} />
            <Route path="/me/:name/profile" element={<UserProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
