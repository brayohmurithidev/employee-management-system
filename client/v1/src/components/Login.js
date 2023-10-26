import React from "react";
import { Formik } from "formik";
import { Button, FormControl, TextField, Box } from "@mui/material";
import { login_query } from "../query/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Cannot be empty";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else if (!values.password) {
          errors.password = "Cannot be empty";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        if (await login_query(values, setSubmitting)) {
          localStorage.setItem("user", "Brian");
          navigate("/dashboard", { replace: true });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <form className="login-form" onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                error={!!errors.email}
                helperText={errors.email && touched.email && errors.email}
                size="small"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </FormControl>
            <FormControl>
              <TextField
                size="small"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                value={values.password}
              />
            </FormControl>
            <Button variant="contained" disabled={isSubmitting} type="submit">
              Login
            </Button>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
