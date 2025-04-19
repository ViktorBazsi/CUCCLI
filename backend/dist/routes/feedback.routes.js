"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _feedbackController = _interopRequireDefault(require("../controllers/feedback.controller.js"));
var _authMiddleware = _interopRequireDefault(require("../middlewares/auth.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/:performanceId", _authMiddleware["default"].authenticate, _feedbackController["default"].create);
router.get("/", _feedbackController["default"].listall);
router.get("/:id", _feedbackController["default"].getById);
router["delete"]("/:id", _authMiddleware["default"].authenticate, _feedbackController["default"].destroy);
var _default = exports["default"] = router;