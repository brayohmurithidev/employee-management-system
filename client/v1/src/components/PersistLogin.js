import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PersistLogin = () => {
  const { currentUser } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (currentUser) {
        setIsLoading(false);
        setLoggedIn(true);
      } else {
        setIsLoading(false);
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return <p>Loading ...</p>;
  } else if (!loggedIn) {
    navigate("/login", { state: { from: location.pathname } });
    return null; // You can return null or some other component if needed
  } else {
    return <Outlet />;
  }
};

export default PersistLogin;
