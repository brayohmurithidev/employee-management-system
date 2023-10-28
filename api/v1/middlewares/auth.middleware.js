import jwt from "jsonwebtoken";

//CREATE A VERIFY TOKEN AUTH
export const verify_token = async (req, res, next) => {
  try {
    const tokenHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    if (!tokenHeader) {
      return res.status(401).json({ msg: "No token found!" });
    }
    const token = tokenHeader.split(" ")[1];
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Token Key is invalid" });
      }
      req.userId = decoded.id;
      req.userRoles = decoded.roles;
      return next();
    });
  } catch (err) {
    next(err);
  }
};

//ROLE BASED AUTH
export const role_auth = (roles) => {
  return async (req, res, next) => {
    try {
      const rolePresent = req.userRoles.some((el) => roles.includes(el));
      if (!rolePresent) {
        return res.status(401).json({ msg: "Not allowed" });
      }
      return next();
    } catch (err) {
      console.log(err);
    }
  };
};
