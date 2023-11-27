import axios from "axios";

const Axios = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export default Axios;
