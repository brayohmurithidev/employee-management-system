import React from "react";
import { Box } from "@mui/material";

const Dashboard = ({ user }) => {
  return (
    <Box>
      <h2>Welcome, {user}</h2>
    </Box>
  );
};
export default Dashboard;
