import React from "react";
import { Box, Button } from "@mui/material";
import { logout } from "../query/auth";

const Navbar = ({ user }) => {
  return (
    <Box>
      <Button variant="contained" onClick={logout()}>
        Logout
      </Button>
    </Box>
  );
};
export default Navbar;
