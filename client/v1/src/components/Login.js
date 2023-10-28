import React from "react";
import { Formik } from "formik";
import { Button, FormControl, TextField, Box } from "@mui/material";
import { login_query } from "../query/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Field cannot be empty"),
  password: Yup.string()
    .required("Field cannot be empty")
    .min(8, "Password should be atleast 8 characters"),
});

const Login = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const to = location?.state?.from || "/";

  if (currentUser) {
    navigate(to, { replace: true });
    return null;
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        if (await login_query(values, setCurrentUser)) {
          return toast.success("Logged in successfully");
          return navigate(to, { replace: true });
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
                error={touched.email && Boolean(errors.email)}
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
                error={touched.password && Boolean(errors.password)}
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
