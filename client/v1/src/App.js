import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contexts/authContext";
import PersistLogin from "./components/PersistLogin";

function App() {
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <>
      <Routes>
        {/*Public routes*/}
        <Route path="/login" element={<Login />} />
        {/*  PRIVATE ROUTES*/}
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
