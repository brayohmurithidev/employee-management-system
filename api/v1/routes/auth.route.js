import express from "express";
import {
  login,
  logout,
  refresh_token,
  reset_password,
} from "../controllers/auth.controller.js";
import { verify_token } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(login);
router.route("/refresh-token").post(refresh_token);
router.route("/reset-password/:id").post(verify_token, reset_password);
router.route("/logout").post(verify_token, logout);

export default router;
