import React, { useState } from "react";
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import NewAppraisal from "./NewAppraisal";

const SelfReview = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Paper elevation={3} sx={{ width: "100%", padding: "20px" }}>
        {/*  APPLY LEAVE BUTTON*/}
        <Button
          onClick={handleOpen}
          sx={{ marginBottom: "20px" }}
          variant="contained"
        >
          SELF APPRAISAL
        </Button>

        {/*  LEAVE DETAILS*/}

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440, width: "100%" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Review Date</TableCell>
                  <TableCell>Appraisal Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2023-11-14</TableCell>
                  <TableCell>Annual</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>
                    <Button startIcon={<Visibility />}>VIEW</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2023-11-14</TableCell>
                  <TableCell>Annual</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>
                    <Button startIcon={<Visibility />}>VIEW</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>2023-11-14</TableCell>
                  <TableCell>Annual</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>
                    <Button startIcon={<Visibility />}>VIEW</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>2023-11-14</TableCell>
                  <TableCell>Annual</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>
                    <Button startIcon={<Visibility />}>VIEW</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>2023-11-14</TableCell>
                  <TableCell>Annual</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>
                    <Button startIcon={<Visibility />}>VIEW</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { sm: "90%", md: "60%" },
            maxHeight: "80%",
            overflowY: "scroll",
            backgroundColor: "background.paper",
            padding: "30px",
          }}
          elevation={3}
        >
          <NewAppraisal />
        </Paper>
      </Modal>
    </>
  );
};

export default SelfReview;
