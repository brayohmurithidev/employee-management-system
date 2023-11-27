import { Employee, User } from "../models/index.models.js";
import { apiResponse } from "../utils/response.js";
import {
  confirm_password,
  generate_otp,
  generate_token,
  hash_password,
} from "../utils/utils.js";
import jwt from "jsonwebtoken";
import main from "../utils/mail.js";
import { reset_password_otp } from "../utils/mailTemplates.js";
import client from "../config/redis.config.js";

// Register User
export const register_user = async (req, res, next) => {
  try {
    let { email, password, roles } = req.body;

    if (password.length < 8) {
      return res
        .status(400)
        .json(
          apiResponse(
            "BAD_PASSWORD_LENGTH",
            null,
            "Password must be at least 8 characters long",
            400,
          ),
        );
    } else {
      password = hash_password(password);
    }
    const userEmail = email;
    const user = await User.findOne({ where: { userEmail } });
    if (user) {
      return res
        .status(400)
        .json(
          apiResponse(
            "CONFLICT",
            null,
            `User with email ${email} already exists`,
            400,
          ),
        );
    }
    await User.create({
      userEmail: email,
      password: password,
      userRoles: roles,
    });
    return res
      .status(200)
      .json(apiResponse("SUCCESS", null, "User created successfully", 201));
  } catch (error) {
    next(error);
  }
};

// LOGIN USER

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const logPassword = req.body.password;

    const user = await User.findOne({
      include: {
        model: Employee,
        as: "employee",
        include: ["educations", "experiences", "relatives", "department"],
      },
      where: { userEmail: email },
    });
    if (!user) {
      return res
        .status(404)
        .json(
          apiResponse("NOT_FOUND", null, `User with email ${email} not found`),
        );
    }
    const check_pwd = await confirm_password(logPassword, user.password);
    if (!check_pwd) {
      User.update(
        {
          failedLoginAttempts: parseInt(user.failedLoginAttempts) + 1,
        },
        { where: { id: user.id } },
      );
      if (parseInt(user.failedLoginAttempts) % 5 === 1) {
        User.update(
          {
            isLocked: true,
          },
          { where: { id: user.id } },
        );
        return res.sendStatus(403);
      }
      return res
        .status(401)
        .json({ status: "UNAUTHORIZED", msg: `Password is incorrect` });
    }
    const data = {
      ...user.toJSON(),
    };
    await User.update({ lastLogin: Date.now() }, { where: { id: user.id } });
    const refresh_token = await jwt.sign(data, await client.get("SECRET_KEY"));
    // Set a cookie with an expiry date (e.g., 7 days from the current date)
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    const token = await generate_token(data);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      expires: oneWeekFromNow,
    });

    const { password, ...newData } = data;

    return res.status(200).json({
      ...newData,
      expires_in: 15,
      firstLogin: user.firstLogin,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// 2FA LOGIN
// REFRESH USER TOKEN
export const refresh_token = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decode = await jwt.verify(
      refresh_token,
      await client.get("SECRET_KEY"),
    );
    const { exp, iat, ...data } = decode;
    const token = await generate_token(data);

    const user = await User.findOne({
      include: {
        model: Employee,
        as: "employee",
        include: ["educations", "experiences", "relatives", "department"],
      },
      where: { id: data.id },
    });

    const newData = {
      ...user.toJSON(),
    };

    const { password, ...finalData } = data;

    return res.status(200).json({
      ...finalData,
      expires_in: 1,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT USER
export const logout = async (req, res, next) => {
  try {
    res.cookie("refresh_token", null, { maxAge: 0, httpOnly: true });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
// PASSWORD RESET
export const reset_password = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newPassword = req.body.password;
    const password = await hash_password(newPassword);
    await User.update(
      {
        password: password,
        lastPasswordResetDate: Date.now(),
        firstLogin: false,
        passwordResetOTP: null,
      },
      { where: { id: id } },
    );

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// RESET PASSWORD OTP
export const request_otp = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({ where: { userEmail: email } });
    if (!user) {
      return res.sendStatus(404);
    }
    const otp = generate_otp();
    const hashed_otp = await hash_password(otp.toString());
    await main(email, "RESET PASSWORD CODE", reset_password_otp(otp, email));
    await User.update(
      { passwordResetOTP: hashed_otp },
      { where: { userEmail: email } },
    );
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD WITH OTP
export const reset_password_by_otp = async (req, res, next) => {
  try {
    const otp = req?.query?.otp || req?.body?.otp;
    const email = req?.query?.email || req?.body?.email;
    const newPassword = req.body.password;
    const password = await hash_password(newPassword);
    const user = await User.findOne({ where: { userEmail: email } });
    if (!user) {
      return res.sendStatus(404);
    }
    const check_otp = await confirm_password(
      otp.toString(),
      user.passwordResetOTP,
    );
    if (!check_otp) {
      return res.sendStatus(403);
    }
    await User.update(
      {
        password: password,
        lastPasswordResetDate: Date.now(),
        passwordResetOTP: null,
      },
      { where: { userEmail: email } },
    );

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
