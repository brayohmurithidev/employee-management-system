import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { DashboardTwoTone } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          {
            name: "Dashboard",
            icon: <DashboardTwoTone />,
            to: (currentUser?.employee?.name || "")
              ?.split(" ")
              .map((s) => s.toLowerCase())
              .join("-"),
          },
          { name: "Leave management", icon: <DashboardTwoTone /> },
          { name: "Performance Management", icon: <DashboardTwoTone /> },
          { name: "Notification", icon: <DashboardTwoTone /> },
        ].map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <Link to={item?.to}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default Sidebar;
