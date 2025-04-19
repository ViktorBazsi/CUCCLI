"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _likeController = _interopRequireDefault(require("../controllers/like.controller.js"));
var _authMiddleware = _interopRequireDefault(require("../middlewares/auth.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// POST /api/like/:performanceId => like / dislike toggle
router.post("/:performanceId", _authMiddleware["default"].authenticate, _likeController["default"].toggleLike);
var _default = exports["default"] = router;