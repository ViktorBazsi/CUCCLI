import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new HttpError("Token missing, jelentkezz be!", 401));
  try {
    const userDecoded = jwt.verify(token, JWT_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    next(new HttpError("Admin role required", 403));
  }
};

const isTheaterAdmin = (req, res, next) => {
  if (req.user && req.user.role === "THEATERADMIN") {
    next();
  } else {
    next(new HttpError("TheaterAdmin role required", 403));
  }
};

const isPerformer = (req, res, next) => {
  if (req.user && req.user.role === "PERFORMER") {
    next();
  } else {
    next(new HttpError("Performer role required", 403));
  }
};

export default {
  authenticate,
  isAdmin,
  isTheaterAdmin,
  isPerformer,
};
