"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _personController = _interopRequireDefault(require("../controllers/person.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/by-date/:dateId", _personController["default"].listByDateId);
router.get("/", _personController["default"].listAll);
var _default = exports["default"] = router;