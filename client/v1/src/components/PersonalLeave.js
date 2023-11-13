import React from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PersonalLeave = () => {
  return (
    <Paper elevation={3} sx={{ width: "100%", padding: "20px" }}>
      {/*  APPLY LEAVE BUTTON*/}

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
    </Paper>
  );
};

export default PersonalLeave;
