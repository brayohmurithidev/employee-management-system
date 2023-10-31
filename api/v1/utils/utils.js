import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GENERATE PASSWORD
export const generate_first_time_password = () => {
  let pass = "";
  let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i <= 8; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
};

// GENERATE OTP
export const generate_otp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// HASH PASSWORD
export const hash_password = async (password) => {
  const hashed = await bcrypt.hash(password, 10);

  return hashed.toString();
};

//VALIDATE PASSWORD
export const confirm_password = async (password, db_password) => {
  return bcrypt.compare(password, db_password);
};

// GENERATE TOKEN
export const generate_token = async (data) => {
  try {
    return await jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "15m" });
  } catch (error) {
    console.log(error);
  }
};
// VERIFY TOKEN
