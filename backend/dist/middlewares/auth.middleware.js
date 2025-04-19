import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";
import jwt from "jsonwebtoken";
var authenticate = function authenticate(req, res, next) {
  var token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return next(new HttpError("Token missing, jelentkezz be!", 401));
  try {
    var userDecoded = jwt.verify(token, JWT_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    next(error);
  }
};
var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    next(new HttpError("Admin role required", 403));
  }
};
var isTheaterAdmin = function isTheaterAdmin(req, res, next) {
  if (req.user && req.user.role === "THEATERADMIN") {
    next();
  } else {
    next(new HttpError("TheaterAdmin role required", 403));
  }
};
var isPerformer = function isPerformer(req, res, next) {
  if (req.user && req.user.role === "PERFORMER") {
    next();
  } else {
    next(new HttpError("Performer role required", 403));
  }
};
export default {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isTheaterAdmin: isTheaterAdmin,
  isPerformer: isPerformer
};