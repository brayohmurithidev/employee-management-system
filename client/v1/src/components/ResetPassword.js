import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import * as Yup from "yup";
import Axios from "../api/axiosCofig";
import { toast } from "react-toastify";

const reset_password_firstLogin = Yup.object().shape({
  password: Yup.string()
    .required("Field cannot be empty")
    .min(8, "Should be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Field cannot be empty")
    .min(8, "Should be at least 8 characters")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const ResetPassword = () => {
  const { setCurrentUser, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const to = "/";

  if (currentUser) {
    navigate(to, { replace: true, state: null });
    return null;
  }

  return location?.state?.firstLogin ? (
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
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={reset_password_firstLogin}
        onSubmit={async (values) => {
          try {
            const res = await Axios.post(
              `/auth/reset-password/${location?.state?.user?.id}`,
              {
                password: values.password,
              },
            );
            console.log(res);
            if (res?.status === 200) {
              setCurrentUser(location?.state?.user);
              toast.success("Password reset successfully, Redirecting ...");
              setTimeout(
                () => navigate(to, { replace: true, state: null }),
                1000,
              );
            }
          } catch (error) {
            console.log(error);
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
        }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>
              Hi,Before you proceed, you need to set an easy to remember
              password{" "}
            </h3>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Confirm password"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword
                }
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  ) : (
    <Formik
      initialValues={{
        email: "",
        resetOTP: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={() => console.log("submitting")}
    ></Formik>
  );
};

export default ResetPassword;
