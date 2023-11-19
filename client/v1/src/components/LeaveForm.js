import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  pickersLayoutClasses,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import {
  DateRangePicker,
  StaticDateRangePicker,
} from "@mui/x-date-pickers-pro";
import { Add, Delete } from "@mui/icons-material";
import moment from "moment";
import { toast } from "react-toastify";

const leaveTypes = [
  "Annual Leave",
  "Maternity Leave",
  "Sick Leave",
  "Unpaid Leave",
  "Compassionate Leave",
];

const LeaveForm = () => {
  const [coverData, setCoverData] = useState(null);
  const [jobCovers, setJobCovers] = useState([]);

  const handleChange = (e) => {
    setCoverData({
      ...coverData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = () => {
    if (
      coverData === null ||
      !(
        coverData.hasOwnProperty("dateFrom") &&
        coverData.hasOwnProperty("dateTo") &&
        coverData.hasOwnProperty("task") &&
        coverData.hasOwnProperty("who")
      ) ||
      coverData.dateFrom === "" ||
      coverData.dateTo === "" ||
      coverData.task === "" ||
      coverData.who === ""
    ) {
      return toast.error("Fill in all the data");
    }
    setJobCovers([...jobCovers, coverData]);
    setCoverData(null);
  };

  const handleDelete = (index) => {
    const result = window.confirm("You are about to delete data");
    if (result) {
      setJobCovers((prev) => {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }
  };

  return (
    <Formik initialValues={{}} onSubmit={{}}>
      <form style={{ width: "100%" }}>
        <Typography variant="h3">Leave Information</Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="leave-type">Leave Type</InputLabel>
              <Select labelId="leave-type" label="Leave Type">
                {leaveTypes.map((type, i) => (
                  <MenuItem key={i} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <DatePicker label="Date From" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <DatePicker label="Date To" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <TextField label="Number of Days" type="number" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <DatePicker label="Date To" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Leave Purpose"
                type="text"
                multiline
                minRows={4}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "40px" }} />
        <Typography sx={{ margin: "20px 0px 20px 0" }} variant="h3">
          Alternative To Cover Job
        </Typography>

        <TableContainer sx={{ maxHeight: 440, marginBottom: "30px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Person</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Date From</TableCell>
                <TableCell>Date To</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {jobCovers.map((cover, i) => (
              <TableBody>
                <TableRow>
                  <TableCell>{cover.who}</TableCell>
                  <TableCell>{cover.task}</TableCell>
                  <TableCell>Date From</TableCell>
                  <TableCell>Date To</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(i)}
                      color="danger"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>

        <Grid sx={{ alignItems: "center" }} container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                name="task"
                value={coverData?.task || ""}
                onChange={(e) => handleChange(e)}
                label="Task"
                type="text"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                name="who"
                value={coverData?.who || ""}
                onChange={(e) => handleChange(e)}
                label="Who"
                type="text"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <DatePicker
                name="dateFrom"
                openTo="year"
                value={coverData?.dateFrom}
                onChange={(newValue) =>
                  setCoverData({
                    ...coverData,
                    dateFrom: newValue || moment("2023-04-17"),
                  })
                }
                label="Date From"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <DatePicker
                name="dateTo"
                openTo="year"
                value={coverData?.dateTo}
                onChange={(newValue) =>
                  setCoverData({
                    ...coverData,
                    dateTo: newValue || moment("2023-04-17"),
                  })
                }
                label="Date To"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button onClick={handleAdd} startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Formik>
  );
};

export default LeaveForm;
