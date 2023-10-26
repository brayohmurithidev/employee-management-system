import axios from "axios";
import { toast } from "react-toastify";

export const login_query = async (data, setIsSubmitting) => {
  setIsSubmitting(true);
  try {
    await axios.post("/api/v1/auth", data, {
      withCredentials: true,
    });
    return toast.success("Logged in successfully");
  } catch (error) {
    if (!error.response) {
      toast.error("Server Error");
    } else if (error.response.status === 401 || error.response.status === 404) {
      toast.error("Invalid email/ password");
    } else {
      toast.error("An error occurred");
    }
    console.log(error.response.status);
  }
};

//LOGOUT
export const logout = () => {
  return localStorage.removeItem("user");
};
