"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ratingController = _interopRequireDefault(require("../controllers/rating.controller.js"));
var _authMiddleware = _interopRequireDefault(require("../middlewares/auth.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/:performanceId", _authMiddleware["default"].authenticate, _ratingController["default"].create);
router.get("/", _ratingController["default"].listall);
router.get("/:id", _ratingController["default"].getById);
router["delete"]("/:id", _authMiddleware["default"].authenticate, _ratingController["default"].destroy);
var _default = exports["default"] = router;