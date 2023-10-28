import React from "react";
import { Formik } from "formik";
import { Button, FormControl, TextField, Box } from "@mui/material";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";
import Axios from "../api/axiosCofig";

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
    navigate(to, { replace: true, state: null });
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await Axios.post("/auth", values, {
              withCredentials: true,
            });
            console.log(res);
            const { token, firstLogin, ...user } = res.data;
            Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            if (firstLogin) {
              return navigate("/reset-password", {
                replace: true,
                state: {
                  user: user,
                  firstLogin: true,
                },
              });
            }
            setCurrentUser(user);
            return true;
          } catch (error) {
            if (!error.response) {
              toast.error("Server Error");
            } else if (
              error.response.status === 401 ||
              error.response.status === 404
            ) {
              toast.error("Invalid email/ password");
            } else {
              toast.error("An error occurred");
            }
            return false;
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
            <p>
              Forgot password ?{" "}
              <span>
                <Link to="/reset-password" state={{ firstLogin: false }}>
                  Reset
                </Link>
              </span>
            </p>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
