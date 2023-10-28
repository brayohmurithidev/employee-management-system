import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../api/axiosCofig";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REFRESH TOKEN
  const refreshToken = () => {
    axios
      .post("/auth/refresh-token")
      .then((res) => {
        const { expires_in, token, ...user } = res.data;
        Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        //     CREATE AN AUTO REFRESH
        setTimeout(
          () => {
            refreshToken();
          },
          expires_in * 60000 - 500,
        );
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
        setCurrentUser(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
