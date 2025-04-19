"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constants = require("../constants/constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authOptional = function authOptional(req, res, next) {
  var authHeader = req.headers.authorization;
  if (authHeader !== null && authHeader !== void 0 && authHeader.startsWith("Bearer ")) {
    var token = authHeader.split(" ")[1];
    try {
      var decoded = _jsonwebtoken["default"].verify(token, _constants.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Hiba esetén ne dobjunk, csak menjünk tovább user nélkül
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};
var _default = exports["default"] = {
  authOptional: authOptional
};