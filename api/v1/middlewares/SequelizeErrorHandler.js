import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
  ConnectionError,
  TimeoutError,
} from "sequelize";
import logger from "../utils/logger.js";

const SequelizeErrorHandler = (err, req, res, next) => {
  console.log("Middleware Sequelize Error Handling");
  let statusCode = 500;
  let errorMessage = "Something went wrong";

  if (err instanceof ValidationError) {
    statusCode = 400; // Bad Request
    errorMessage = `Validation Error: ${err.errors[0].message}`;
    logger.error(err);
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 400; // Bad Request
    errorMessage = `Unique Constraint Violation: ${err.errors[0].message}`;
    logger.error(err);
  } else if (err instanceof ForeignKeyConstraintError) {
    statusCode = 400; // Bad Request
    errorMessage = `Foreign Key Constraint Violation: ${err}`;
    logger.error(err);
  } else if (err instanceof DatabaseError) {
    statusCode = 500; // Internal Server Error
    errorMessage = `Database Error: ${err}`;
    logger.error(err);
  } else if (err instanceof ConnectionError || err instanceof TimeoutError) {
    statusCode = 503; // Service Unavailable
    errorMessage = `Database Connection Error: ${err}`;
    logger.error(err);
  } else {
    return next(err);
  }

  res.status(statusCode).json({
    // method: req.method,
    // url: req.originalUrl,
    success: false,
    status: statusCode,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default SequelizeErrorHandler;
