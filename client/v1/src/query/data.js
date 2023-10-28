import axios from "axios";

export const query_employees = async () => {
  try {
    const users = await axios.get("/api/v1/employees?page=2");
    console.log(users);
  } catch (err) {
    console.log(err);
  }
};
