import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../api/axiosCofig";

const Logout = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await Axios.post("/auth/logout");
      setCurrentUser(null);
      return navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button variant="container" onClick={handleLogout}>
      Logout
    </Button>
  );
};
export default Logout;
