import express from "express";
import {
  login,
  logout,
  refresh_token,
  request_otp,
  reset_password,
  reset_password_by_otp,
} from "../controllers/auth.controller.js";
import { verify_token } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(login);
router.route("/refresh-token").post(refresh_token);
router.route("/request-otp").post(request_otp);
router.route("/reset-password-with-otp").post(reset_password_by_otp);
router.route("/reset-password/:id").post(verify_token, reset_password);
router.route("/logout").post(verify_token, logout);

export default router;
