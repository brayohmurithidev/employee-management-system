import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PersistLogin = () => {
  const { currentUser } = useAuth();
  console.log("current user: ", currentUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const to = location?.state?.from || "/";

  useEffect(() => {
    try {
      if (currentUser) {
        setIsLoading(false);
        setLoggedIn(true);
        navigate(to, { replace: true });
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

  return isLoading ? (
    <p>Loading ...</p>
  ) : !loggedIn ? (
    navigate("/login", { state: { from: location.pathname } })
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
