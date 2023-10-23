import bcrypt from "bcrypt";

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

// HASH PASSWORD
export const hash_password = async (password) => {
  const hashed = await bcrypt.hash(password, 10);

  return hashed.toString();
};

//VALIDATE PASSWORD
export const confirm_password = async (password, db_password) => {
  if (!bcrypt.compare(password, db_password)) {
    return false;
  }
  return true;
};
