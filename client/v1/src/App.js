import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
