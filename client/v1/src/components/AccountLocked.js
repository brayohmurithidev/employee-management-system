import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccountLocked = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(countdown);
        navigate("/login", { replace: true });
        // Timer has reached 0, you can add your action here.
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h2>Ops!, Your account has been locked</h2>
      <h3>
        Please try again in: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h3>
    </Box>
  );
};
export default AccountLocked;
