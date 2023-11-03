import logger from "../utils/logger.js";

const ErrorHandler = (err, req, res) => {
  console.log("Middleware Error Handling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  logger.error(err);
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
};

export default ErrorHandler;
