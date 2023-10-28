import { User } from "../models/index.models.js";
import { apiResponse } from "../utils/response.js";
import {
  confirm_password,
  generate_token,
  hash_password,
} from "../utils/utils.js";
import jwt from "jsonwebtoken";

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

    const user = await User.findOne({ where: { userEmail: email } });
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
    let session;

    const user = await User.findOne({
      include: "employee",
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
      return res
        .status(401)
        .json({ status: "UNAUTHORIZED", msg: `Password is incorrect` });
    }
    const data = {
      ...user.toJSON(),
    };
    await User.update({ lastLogin: Date.now() }, { where: { id: user.id } });
    const refresh_token = await jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    const token = await generate_token(data);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
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
    const decode = await jwt.verify(refresh_token, process.env.SECRET_KEY);
    const { exp, iat, ...data } = decode;
    const token = await generate_token(data);
    return res.status(200).json({
      data,
      expires_in: 15,
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
    const user_to_update = await User.update(
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
