import { User } from "../models/index.models.js";
import { apiResponse } from "../utils/response.js";
import { hash_password } from "../utils/utils.js";

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
            400
          )
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
            400
          )
        );
    }
    await User.create({
      userEmail: email,
      password: password,
      userRoles: roles,
    });
    return response
      .status(200)
      .json(apiResponse("SUCCESS", null, "User created successfully", 201));
  } catch (error) {
    next(error);
  }
};

// LOGIN USER

// 2FA LOGIN
// REFRESH USER TOKEN
// LOGOUT USER
// PASSWORD RESET
