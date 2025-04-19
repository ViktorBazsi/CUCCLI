"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _HttpError = _interopRequireDefault(require("../utils/HttpError.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var errorHandler = function errorHandler(err, req, res, next) {
  if (err instanceof _HttpError["default"]) res.status(err.status).json({
    error: err.message
  });
  console.log("Internal Server Error", err);
  res.status(500).json({
    error: "Internal Server Error"
  });
  return next;
};
var _default = exports["default"] = errorHandler;