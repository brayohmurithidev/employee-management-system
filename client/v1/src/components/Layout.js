import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Outlet />
      <h3>Footer Goes here</h3>
    </Box>
  );
};

export default Layout;
