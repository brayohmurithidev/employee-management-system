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

// EMAIL CHECK
const check_email_form = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
});

// OTP CHECK
const check_otp_form = Yup.object().shape({
  otp: Yup.number("Can be of type number only").min(6, "Should be 6 digits"),
  password: Yup.string()
    .required("Field cannot be empty")
    .min(8, "Should be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Field cannot be empty")
    .min(8, "Should be at least 8 characters")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const ResetPassword = () => {
  const [userEmail, setUserEmail] = useState(null);
  const { setCurrentUser, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
              Reset
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  ) : (
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
        validationSchema={check_email_form}
        initialValues={{
          email: "",
        }}
        onSubmit={async (values) => {
          try {
            setIsLoading(true);
            const res = await Axios.post("/auth/request-otp", values);
            if (res?.status === 200) {
              setIsSent(true);
              setIsLoading(false);
            }
            setUserEmail(values.email);
            setIsLoading(false);
            return toast.success(
              "A 6 digit code was successfully sent to your  email",
            );
          } catch (error) {
            if (!error.response) {
              return toast.error("An error occurred");
            } else if (error?.response?.status === 404) {
              return toast.error("You entered a wrong email address");
            } else {
              return toast.error("Uknown error occured");
            }
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <h4>Reset your password</h4>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <TextField
                name="email"
                label="email"
                size="small"
                type="email"
                disabled={isSent}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={errors.email && touched.email && errors.email}
              />

              <Button
                sx={{ padding: "8px 20px" }}
                variant="contained"
                size="small"
                disabled={isSent || isLoading}
                type="submit"
              >
                {isLoading ? "Sending ..." : "Send OTP"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {
        isSent && (
          <Formik
            validationSchema={check_otp_form}
            initialValues={{
              resetOTP: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values) => {
              try {
                setIsLoading(true);
                const res = await Axios.post(
                  `/auth/reset-password-with-otp/?email=&otp=`,
                  {
                    email: userEmail,
                    otp: values.otp,
                    password: values.password,
                  },
                );
                if (res?.status === 200) {
                  setIsLoading(false);
                }
                setIsLoading(false);
                toast.success("Password was reset successfully");
                setTimeout(() => navigate("/login", { replace: true }), 1000);
              } catch (error) {
                setIsLoading(false);
                if (!error.response) {
                  return toast.error("An error occurred");
                } else if (error?.response?.status === 404) {
                  return toast.error("Not found user");
                } else if (error?.response?.status === 403) {
                  return toast.error("Invalid OTP");
                } else {
                  return toast.error("Unknown error occurred");
                }
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {({
              values,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
              touched,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label="OTP Code"
                    type="text"
                    name="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otp}
                    error={touched.otp && Boolean(errors.otp)}
                    helperText={errors.otp && touched.otp && errors.otp}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword
                      }
                    />
                  </FormControl>
                </Box>
                <Button
                  sx={{ padding: "8px 20px" }}
                  variant="contained"
                  size="small"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? "Resetting ..." : "Reset"}
                </Button>
              </form>
            )}
          </Formik>
        )
        //     DISPLAY BASED ON IF CODE IS REQUESTED
      }
    </Box>
  );
};

export default ResetPassword;
