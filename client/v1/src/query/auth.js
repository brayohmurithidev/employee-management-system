import { toast } from "react-toastify";
import Axios from "../api/axiosCofig";

export const login_query = async (data, setCurrentUser) => {
  try {
    const res = await Axios.post("/auth", data, {
      withCredentials: true,
    });
    const { token, ...user } = res.data;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCurrentUser(user);
    return true;
  } catch (error) {
    if (!error.response) {
      toast.error("Server Error");
    } else if (error.response.status === 401 || error.response.status === 404) {
      toast.error("Invalid email/ password");
    } else {
      toast.error("An error occurred");
    }
    return false;
  }
};
