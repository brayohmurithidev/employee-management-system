import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { NavLinks } from "../utils/navLinks";
import Permissions from "./Permissions";

const Sidebar = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Toolbar />
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "10px",
        }}
      >
        {NavLinks.map((nav) =>
          !nav.hasOwnProperty("sub_menus") ? (
            <Permissions key={nav.name} permission={nav.permission}>
              <ListItem disablePadding>
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    fontSize: "12px",
                    ":hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                  variant="contained"
                  component={Link}
                  to={
                    nav.name === "Dashboard"
                      ? `/me/${(currentUser?.employee?.name || "")
                          ?.split(" ")
                          .map((s) => s.toLowerCase())
                          .join("-")}`
                      : nav?.path
                  }
                >
                  {nav.name}
                </Button>
              </ListItem>
            </Permissions>
          ) : (
            <Permissions key={nav.name} permission={nav.permission}>
              <ListItem disablePadding>
                <Accordion>
                  <AccordionSummary
                    // component={Button}
                    expandIcon={<ExpandMore />}
                  >
                    <Typography>{nav.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {nav?.sub_menus.map((subMenu) => (
                        <>
                          <Permissions
                            key={subMenu.name}
                            permission={subMenu.permission}
                          >
                            <ListItem disablePadding>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "#000",
                                }}
                                to={subMenu.path}
                              >
                                {subMenu.name}
                              </Link>
                            </ListItem>
                            <Divider />
                          </Permissions>
                        </>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            </Permissions>
          ),
        )}
      </List>
    </div>
  );
};
export default Sidebar;
