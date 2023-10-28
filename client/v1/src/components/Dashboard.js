import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "../contexts/authContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  return (
    <Box>
      <h2>Welcome {currentUser?.employee?.name}</h2>
    </Box>
  );
};
export default Dashboard;
