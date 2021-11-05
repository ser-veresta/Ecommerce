import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

export const verifyToken = (req, res, next) => {
  const header = req.headers.token;

  if (!header) return next(new ErrorResponse("Not authorized", 401));

  try {
    const token = header.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    const id = req.params.id;
    if (req.user.id === id || req.user.isAdmin) {
      next();
    } else {
      return next(new ErrorResponse("Not authorized", 403));
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(new ErrorResponse("Not authorized", 403));
    }
  });
};
