import { User } from "../models/index.models.js";
import { apiResponse } from "../utils/response.js";
import {
  confirm_password,
  generate_token,
  hash_password,
} from "../utils/utils.js";

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
    const { email, password } = req.body;
    let session;

    const user = await User.findOne({ where: { userEmail: email } });
    if (!user) {
      return res
        .status(404)
        .json(
          apiResponse("NOT_FOUND", null, `User with email ${email} not found`),
        );
    }
    const check_pwd = await confirm_password(password, user.password);
    if (!check_pwd) {
      return res
        .status(401)
        .json({ status: "UNAUTHORIZED", msg: `Password is incorrect` });
    }
    const data = {
      id: user.id,
      roles: user.userRoles,
    };
    const token = await generate_token(data);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
    });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

// 2FA LOGIN
// REFRESH USER TOKEN
// LOGOUT USER
// PASSWORD RESET
