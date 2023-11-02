import React from "react";
import { Box, Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const NoMatch = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Page Not Found</h2>
      <Box>
        <Button
          onClick={() =>
            currentUser
              ? navigate(
                  `/me/${(currentUser?.employee?.name || "")
                    ?.split(" ")
                    .map((s) => s.toLowerCase())
                    .join("-")}`,
                  { replace: true },
                )
              : navigate("/", { replace: true })
          }
          startIcon={<Home />}
        >
          Go Back Home
        </Button>
      </Box>
    </Box>
  );
};

export default NoMatch;
