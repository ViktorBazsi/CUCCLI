"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _constants = require("./constants/constants.js");
var _errorHandlerMiddleware = _interopRequireDefault(require("./middlewares/error-handler.middleware.js"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _personRoutes = _interopRequireDefault(require("./routes/person.routes.js"));
var _dateRoutes = _interopRequireDefault(require("./routes/date.routes.js"));
var _performanceRoutes = _interopRequireDefault(require("./routes/performance.routes.js"));
var _likeRoutes = _interopRequireDefault(require("./routes/like.routes.js"));
var _feedbackRoutes = _interopRequireDefault(require("./routes/feedback.routes.js"));
var _ratingRoutes = _interopRequireDefault(require("./routes/rating.routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: _constants.FRONTEND_URL
}));
app.use(_express["default"].json());
app.use("/auth", _authRoutes["default"]);
app.use("/api/user", _userRoutes["default"]);
app.use("/api/person", _personRoutes["default"]);
app.use("/api/date", _dateRoutes["default"]);
app.use("/api/performance", _performanceRoutes["default"]);
app.use("/api/like", _likeRoutes["default"]);
app.use("/api/feedback", _feedbackRoutes["default"]);
app.use("/api/rating", _ratingRoutes["default"]);
app.use(_errorHandlerMiddleware["default"]);
app.use("/", function (req, res) {
  res.status(404).send("No Endpoint");
});
var _default = exports["default"] = app;