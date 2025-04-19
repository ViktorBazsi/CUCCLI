"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../constants/constants.js");
var _HttpError = _interopRequireDefault(require("../utils/HttpError.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authenticate = function authenticate(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1];
  if (!token) return next(new _HttpError["default"]("Token missing, jelentkezz be!", 401));
  try {
    var userDecoded = _jsonwebtoken["default"].verify(token, _constants.JWT_SECRET);
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
    next(new _HttpError["default"]("Admin role required", 403));
  }
};
var isTheaterAdmin = function isTheaterAdmin(req, res, next) {
  if (req.user && req.user.role === "THEATERADMIN") {
    next();
  } else {
    next(new _HttpError["default"]("TheaterAdmin role required", 403));
  }
};
var isPerformer = function isPerformer(req, res, next) {
  if (req.user && req.user.role === "PERFORMER") {
    next();
  } else {
    next(new _HttpError["default"]("Performer role required", 403));
  }
};
var _default = exports["default"] = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isTheaterAdmin: isTheaterAdmin,
  isPerformer: isPerformer
};