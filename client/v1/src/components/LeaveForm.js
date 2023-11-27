import React, { useState } from "react";
import { Formik } from "formik";
import {
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
import { DatePicker } from "@mui/x-date-pickers";
import * as Yup from "yup";

import { Add, Delete, Edit } from "@mui/icons-material";

import { toast } from "react-toastify";
import dayjs from "dayjs";

const leaveTypes = [
  "Annual Leave",
  "Maternity Leave",
  "Sick Leave",
  "Unpaid Leave",
  "Compassionate Leave",
];

const leaveSchema = Yup.object().shape({
  leaveType: Yup.string("Invalid value").required("Field cannot be empty"),
  numberOfDays: Yup.number("Only numbers are allowed").required(
    "Field cannot be empty",
  ),
  leavePurpose: Yup.string("Only string allowed")
    .required("Field cannot be empty")
    .min(10, "Atleast 10 characters"),
});

const LeaveForm = () => {
  const initialCoverData = {
    task: "",
    who: "",
    dateFrom: new Date().toLocaleDateString(),
    dateTo: new Date().toLocaleDateString(),
  };
  const [coverData, setCoverData] = useState(initialCoverData);
  const [jobCovers, setJobCovers] = useState([]);
  const [isEdit, setIsEdit] = useState({ index: null, edit: false });

  const handleChangeCoverData = (e) => {
    setCoverData({
      ...coverData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = () => {
    console.log(coverData);
    if (!isEdit.edit) {
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
      setCoverData(initialCoverData);
    } else {
      const index = isEdit.index;
      jobCovers[index] = coverData;
      setIsEdit({ index: null, edit: false });
      setCoverData(initialCoverData);
    }
  };

  const handleDelete = (index) => {
    const result = window.confirm("You are about to delete data");
    if (result) {
      setJobCovers((prev) => {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }
  };

  const handleEdit = (index) => {
    setIsEdit({ index: index, edit: true });
    setCoverData(jobCovers[index]);
  };

  return (
    <Formik
      initialValues={{
        leaveType: "",
        dateFrom: new Date().toLocaleDateString(),
        dateTo: new Date().toLocaleDateString(),
        numberOfDays: 0,
        resumeDate: new Date().toLocaleDateString(),
        leavePurpose: "",
      }}
      validationSchema={leaveSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Typography variant="h3">Leave Information</Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="leave-type">Leave Type</InputLabel>
                <Select
                  name="leaveType"
                  value={values.leaveType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.leaveType && Boolean(errors.leaveType)}
                  helperText={
                    errors.leaveType && touched.leaveType && errors.leaveType
                  }
                  labelId="leave-type"
                  label="Leave Type"
                >
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
                <DatePicker
                  value={dayjs(values.dateFrom)}
                  onChange={(newValue) => {
                    const date = new Date(newValue).toLocaleDateString();
                    setFieldValue("dateFrom", date);
                  }}
                  label="Date From"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <DatePicker
                  value={dayjs(values.dateTo)}
                  onChange={(newValue) => {
                    const date = new Date(newValue).toLocaleDateString();
                    setFieldValue("dateTo", date);
                  }}
                  label="Date To"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  name="numberOfDays"
                  value={values.numberOfDays}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.numberOfDays && Boolean(errors.numberOfDays)}
                  helperText={
                    errors.numberOfDays &&
                    touched.numberOfDays &&
                    errors.numberOfDays
                  }
                  label="Number of Days"
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <DatePicker
                  value={dayjs(values.resumeDate)}
                  onChange={(newValue) => {
                    const date = new Date(newValue).toLocaleDateString();
                    setFieldValue("resumeDate", date);
                  }}
                  label="Resume date"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Leave Purpose"
                  name="leavePurpose"
                  value={values.leavePurpose}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.leavePurpose && Boolean(errors.leavePurpose)}
                  helperText={
                    errors.leavePurpose &&
                    touched.leavePurpose &&
                    errors.leavePurpose
                  }
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
                    <TableCell>{cover.dateFrom}</TableCell>
                    <TableCell>{cover.dateTo}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(i)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(i)}
                        color="primary"
                        size="small"
                      >
                        <Edit />
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
                  onChange={(e) => handleChangeCoverData(e)}
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
                  onChange={(e) => handleChangeCoverData(e)}
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
                  format="YYYY-MM-DD"
                  value={dayjs(coverData?.dateFrom)}
                  onChange={(newValue) => {
                    const date = new Date(newValue).toLocaleDateString();
                    setCoverData({
                      ...coverData,
                      dateFrom: date,
                    });
                  }}
                  label="Date From"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <DatePicker
                  name="dateTo"
                  openTo="year"
                  value={dayjs(coverData?.dateTo)}
                  format="YYYY-MM-DD"
                  onChange={(newValue) => {
                    const date = new Date(newValue).toLocaleDateString();
                    setCoverData({
                      ...coverData,
                      dateTo: date,
                    });
                  }}
                  label="Date To"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                onClick={handleAdd}
                startIcon={<Add />}
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
          <Button
            disabled={isSubmitting}
            type="submit"
            sx={{ marginTop: "20px" }}
            variant="contained"
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LeaveForm;
