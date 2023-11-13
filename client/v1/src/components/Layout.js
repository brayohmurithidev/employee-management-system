import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../contexts/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Axios from "../api/axiosCofig";

const drawerWidth = 240;
const Layout = (props) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [appHeight, setAppHeight] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await Axios.post("/auth/logout");
      setCurrentUser(null);
      return navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfile = () => {
    const nameArray = currentUser?.employee?.name?.split(" ");
    const uname = `${nameArray[0].toLowerCase()}-${nameArray[1].toLowerCase()}`;
    return navigate(`/me/${uname}/profile`);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // CALCULATE APPBAR HEIGHT
  useEffect(() => {
    const appBarHeight = document.getElementById("appBar").clientHeight;
    setAppHeight(appBarHeight);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          id="appBar"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: "100%",
                // padding: "0 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3>Hi, {currentUser?.employee?.name?.split(" ")[0]}</h3>
              <Box>
                <AccountCircleIcon
                  id="profile-avator"
                  sx={{ width: "40px", height: "40px" }}
                  aria-controls={open ? "prof-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />

                <Menu
                  id="prof-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "prof-button" }}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Sidebar />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        </Box>
        <Box
          sx={{
            padding: "20px",
            width: "100%",
            marginTop: `${appHeight + 10}px`,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
