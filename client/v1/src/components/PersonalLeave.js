import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import LeaveForm from "./LeaveForm";

const PersonalLeave = () => {
  const [open, setOpen] = useState(false);
  return (
    <Paper elevation={3} sx={{ width: "100%", padding: "20px" }}>
      {/*  APPLY LEAVE BUTTON*/}
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{ marginBottom: "20px" }}
        startIcon={<Add />}
      >
        Apply For a Leave
      </Button>
      {/*  LEAVE DETAILS*/}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "80%",
            maxHeight: "90%",
            overflowY: "scroll",
          }}
        >
          <Paper elevation={3} sx={{ padding: "40px" }}>
            <LeaveForm />
          </Paper>
        </Box>
      </Modal>
    </Paper>
  );
};

export default PersonalLeave;
