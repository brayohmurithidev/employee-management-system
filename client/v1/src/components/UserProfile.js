import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const data = currentUser?.employee;

  const basicInformation = () => {
    return (
      data && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Basic Information</h3>

            <Button size="small" startIcon={<Edit />}>
              Edit
            </Button>
          </Box>
          <Divider />

          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                  <TableCell>{data.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Personal Email Address
                  </TableCell>
                  <TableCell>{data.personalEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Phone Number
                  </TableCell>
                  <TableCell>{data.phone}</TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                  <TableCell>
                    {data.address + "-" + data.postalCode + ", " + data.city}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                  <TableCell>{data.state + ", " + data.nationality}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
                  <TableCell>
                    {data.gender === "M"
                      ? "Male"
                      : data.gender === "F"
                      ? "Female"
                      : "Other"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Password</TableCell>
                  <TableCell>
                    <Link to="#">Change Password</Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
    );
  };

  const currentEmployment = () => {
    return (
      data && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Organization Profile</h3>

            <Button size="small" startIcon={<Edit />}>
              Edit
            </Button>
          </Box>
          <Divider />

          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Work Email</TableCell>
                  <TableCell>
                    {data.workEmail || <Link to="#">Add work Email</Link>}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Employee Id</TableCell>
                  <TableCell>{data.employeeId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                  <TableCell>{data.jobTitle}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                  {/*<TableCell>{data?.department?.initials}</TableCell>*/}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Employment Type
                  </TableCell>
                  <TableCell>{data.employmentType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Employment Date
                  </TableCell>
                  <TableCell>{data.hireDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell>{data.employeeStatus}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
    );
  };

  const contactPerson = () => {
    return (
      data && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Emergency Person & Next of kin</h3>

            <Button size="small" startIcon={<Add />}>
              Add New
            </Button>
          </Box>
          <Divider />

          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Relationship</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.relatives.map((relative) => (
                  <TableRow>
                    <TableCell>{relative.name}</TableCell>
                    <TableCell>{relative.email}</TableCell>
                    <TableCell>{relative.phone}</TableCell>
                    <TableCell>{relative.type}</TableCell>
                    <TableCell>{relative.relationship}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button startIcon={<Edit />}></Button>
                        <Button startIcon={<Delete />}></Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
    );
  };

  return (
    <Grid container spacing={2}>
      {currentUser &&
        [
          "Basic Information",
          "Organization Profile",
          "Employment History",
          "Education Background",
          "Contact Person",
        ].map((item, index) =>
          item === "Employment History" &&
          data?.experiences?.length === 0 ? null : item ===
              "Education Background" &&
            data?.educations?.length === 0 ? null : item === "Contact Person" &&
            data?.relatives?.length === 0 ? null : (
            <Grid
              item
              md={
                item === "Employment History" ||
                item === "Education Background" ||
                item === "Contact Person"
                  ? 12
                  : 6
              }
              key={index}
            >
              <Paper sx={{ padding: "10px" }} elevation={3}>
                <Box>
                  {item === "Basic Information"
                    ? basicInformation()
                    : item === "Organization Profile"
                    ? currentEmployment()
                    : item === "Contact Person"
                    ? contactPerson()
                    : null}
                </Box>
              </Paper>
            </Grid>
          ),
        )}
    </Grid>
  );
};

export default UserProfile;
