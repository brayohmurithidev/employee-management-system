import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Axios from "../api/axiosCofig";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Add, AddCircle, Delete, Edit, Remove } from "@mui/icons-material";
import { object } from "yup";

const ratings = [
  {
    rate: "Outstanding",
    initial: "O",
    description:
      "Employee&#39;s performance is exceptional. Consistently exceeds position expectations with virtually no preventable errors and requiring little or no supervision",
  },
  {
    rate: "Meets Expectation",
    initial: "M",
    description:
      "Competent &amp; dependable performance level. Meets the performance standards and objectives of the job without constant follow-up/direction.",
  },
  {
    rate: "Exceeds Expectation",
    initial: "E",
    description: `Results exceed position requirements regularly. Performance is of high quality and is achieved consistently.`,
  },
  {
    rate: "Improvement Needed",
    initial: "I",
    description: `Employee does not meet performance objectives regularly and has difficulty following through with tasks. Requires constant follow-up/or supervision`,
  },
  {
    rate: "Not Applicable",
    initial: "N/A",
    description: "Too soon to rate",
  },
];

const categories = [
  {
    id: 1,
    category_name: "Quality",
    data_type: "TEXT",
    description:
      "The extent to which an employee's work is completed thoroughly and correctly following established process; procedures. Required paperwork and record-keeping are thorough and neat.",
    status: "active",
    createdAt: "2023-11-06T09:35:57.000Z",
    updatedAt: "2023-11-06T09:43:38.000Z",
  },
  {
    id: 2,
    category_name: "Productivity/Independence/Reliability",
    data_type: null,
    description:
      "The extent to which an employee produces a significant volume of work efficiently in a specific period /before deadlines. Ability to work independently and as a team with little or no direction/follow-up to complete tasks/job assignments.",
    status: "active",
    createdAt: "2023-11-06T09:37:07.000Z",
    updatedAt: "2023-11-06T09:37:07.000Z",
  },
  {
    id: 3,
    category_name: "Job Knowledge",
    data_type: null,
    description:
      "The extent to which an employee possesses and demonstrates an understanding of the work instructions, processes, equipment and materials required to perform the job. Employee possesses the practical and technical knowledge required of the job and is familiar with the routes/areas around Chogoria.",
    status: "active",
    createdAt: "2023-11-06T09:37:44.000Z",
    updatedAt: "2023-11-06T09:37:44.000Z",
  },
  {
    id: 4,
    category_name:
      "Team Work/Interpersonal Relationships / Cooperation / Commitment",
    data_type: null,
    description:
      "The extent to which an employee is willing and demonstrates the ability to cooperate, work and communicate positively with the HopeCore Board, supervisors, co-workers, clients, and/or outside contacts. Employee accepts and responds to change positively. Accepts job assignments and additional duties willingly take responsibility for own performance and job assignments and are willing to share his/her knowledge and experiences. ",
    status: "active",
    createdAt: "2023-11-06T09:38:22.000Z",
    updatedAt: "2023-11-06T09:38:22.000Z",
  },
  {
    id: 5,
    category_name: "Attendance",
    data_type: null,
    description:
      "The extent to which an employee is punctual, observes prescribed work break/meal periods and has an acceptable overall attendance record. Employee's willingness to work overtime if necessary.",
    status: "active",
    createdAt: "2023-11-06T09:39:02.000Z",
    updatedAt: "2023-11-06T09:39:02.000Z",
  },
  {
    id: 6,
    category_name: "Initiative/Creativity",
    data_type: null,
    description:
      "The extent to which an employee seeks out new assignments, proposes improved work methods, suggests ideas to eliminate waste, finds new and better ways of doing things.",
    status: "inactive",
    createdAt: "2023-11-06T09:39:30.000Z",
    updatedAt: "2023-11-06T09:39:30.000Z",
  },
  {
    id: 7,
    category_name: "Adherence to Policy ",
    data_type: null,
    description:
      "The extent to which the employee follows company policies, procedures and work conduct rules. Complies with and follows all safety rules and regulations, wears required safety equipment.",
    status: "active",
    createdAt: "2023-11-06T09:40:00.000Z",
    updatedAt: "2023-11-06T09:40:00.000Z",
  },
  {
    id: 8,
    category_name: "Integrity/professionalism",
    data_type: null,
    description:
      "The extent to which the employees act with integrity and professionalism. This includes honesty and respecting confidentiality.",
    status: "active",
    createdAt: "2023-11-06T09:40:32.000Z",
    updatedAt: "2023-11-06T09:40:32.000Z",
  },
  {
    id: 9,
    category_name: "Lead (if applicable)",
    data_type: null,
    description:
      "The extent to which the employee demonstrates proper judgment and decision-making skills when directing others. Directs workflow in assigned areas effectively to meet production/area goals.",
    status: "active",
    createdAt: "2023-11-06T09:41:02.000Z",
    updatedAt: "2023-11-06T09:41:02.000Z",
  },
  {
    id: 10,
    category_name: "Overall Performance",
    data_type: null,
    description:
      "Rate employee's overall performance in comparison to position duties and responsibilities.",
    status: "active",
    createdAt: "2023-11-06T09:41:33.000Z",
    updatedAt: "2023-11-06T09:41:33.000Z",
  },
];

const NewAppraisal = () => {
  const [counter, setCounter] = useState(0);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({
    comment: "",
    rating: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // const []
  const handlePrev = () => {
    setCounter(counter - 1);
  };

  const handleNext = () => {
    setCounter(counter + 1);
  };
  const handleAdd = (id) => {
    // Update the data state with the current comment and rating
    const newData = { comment: data.comment, rating: data.rating };

    // Update the comments state by adding a new object with id and data
    setComments((prevComments) => [
      ...prevComments,
      { id: id, data: [newData] },
    ]);

    // Optionally, you can clear the data state for the next input
    setData({ comment: "", rating: "" });
    console.log(comments);
  };

  return (
    categories && (
      <Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">
              {categories[counter].category_name}
            </Typography>
            <Typography variant="h6">
              {`${counter + 1} / ${categories.length}`}
            </Typography>
          </Box>

          <p>{categories[counter].description}</p>

          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={8} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Comment"
                  name="comment"
                  value={data.comment}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} md={4}>
              <FormControl fullWidth>
                <InputLabel id="rating-label">Rating</InputLabel>
                <Select
                  labelId="rating-label"
                  id="rating"
                  label="Rating"
                  name="rating"
                  value={data.rating}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {ratings.map((rating, i) => (
                    <MenuItem value={rating.rate}>{rating.rate}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box>
                <IconButton onClick={() => handleAdd(categories[counter].id)}>
                  <AddCircle color="primary" />
                </IconButton>
                {/*<IconButton onClick={handleEdit}>*/}
                {/*  <Edit />*/}
                {/*</IconButton>*/}
                {/*<IconButton color="error" onClick={handleDelete}>*/}
                {/*  <Delete />*/}
                {/*</IconButton>*/}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            marginTop: "30px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            disabled={counter === 0}
            onClick={handlePrev}
          >
            Previous
          </Button>
          {categories.length - 1 === counter ? (
            <Button
              // disabled={categories.length - 1 === counter}
              variant="contained"
              onClick={() => alert("Submit")}
            >
              Submit
            </Button>
          ) : (
            <Button
              disabled={categories.length - 1 === counter}
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    )
  );
};

export default NewAppraisal;
