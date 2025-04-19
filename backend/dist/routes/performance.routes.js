"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _performanceController = _interopRequireDefault(require("../controllers/performance.controller.js"));
var _authOptionalMiddleware = _interopRequireDefault(require("../middlewares/authOptional.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/", _authOptionalMiddleware["default"].authOptional, _performanceController["default"].listArchived);
var _default = exports["default"] = router;