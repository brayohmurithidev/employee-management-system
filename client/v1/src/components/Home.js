import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="start"
      // rowSpacing={2}
      spacing={2}
      sx={{ textAlign: "left", padding: "2rem" }}
    >
      <Grid item style={{ marginBottom: "1rem" }}>
        <Typography variant="h2">
          Welcome to the Employee Management System
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: "1.5rem" }}>
        <Typography variant="body1">
          Our system helps you efficiently manage your employees, streamline
          processes, and keep everything organized.
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: "1.5rem" }}>
        <Typography variant="body1">
          Connect with the developer for any inquiries or feedback:
        </Typography>
      </Grid>

      <Grid item md={3}>
        <Link to="mailto:murithi@mail.com">
          <MailIcon style={{ marginRight: "0.5rem", fontSize: "1.5rem" }} />
          murithi@mail.com
        </Link>
      </Grid>
      <Grid item md={3}>
        <Link to="tel:+254712334554">
          <PhoneIcon style={{ marginRight: "0.5rem", fontSize: "1.5rem" }} />
          +254712334554
        </Link>
      </Grid>
      <Grid item md={3}>
        <Link to="https://github.com/murithi/" target="_blank" rel="noopener">
          <GitHubIcon style={{ marginRight: "0.5rem", fontSize: "1.5rem" }} />
          github.com/murithi
        </Link>
      </Grid>
      <Grid item md={3}>
        <Link
          to="https://www.linkedin.com/in/murithi/"
          target="_blank"
          rel="noopener"
        >
          <LinkedInIcon style={{ marginRight: "0.5rem", fontSize: "1.5rem" }} />
          linkedin.com/in/murithi
        </Link>
      </Grid>
      <Grid item md={3}>
        <Typography
          variant="body1"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Link
            to="https://twitter.com/murithi/"
            target="_blank"
            rel="noopener"
          >
            <TwitterIcon
              style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
            />
            twitter.com/murithi
          </Link>
        </Typography>
      </Grid>
      <Button component={Link} to="/login">
        Login
      </Button>
    </Grid>
  );
};

export default Home;
