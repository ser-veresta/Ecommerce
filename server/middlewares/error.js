import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log(err);

  error.message = err.message;

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token.. login again";
    error = new ErrorResponse(message, 401);
  }

  if (err.message === "jwt expired") {
    const message = "Session expired.. login again";
    error = new ErrorResponse(message, 401);
  }

  if (err.code === 11000) {
    const message = "already exists";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    data: error,
    errorMessage: error.message || "Server Error",
  });
};

export default errorHandler;
