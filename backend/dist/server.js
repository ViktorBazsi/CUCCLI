"use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import app from "./app.js";
// import { HOST, PORT } from "./constants/constants.js";

// app.listen(PORT, () => {
//   console.log(`Server is listening at ${HOST}:${PORT}...`);
// });

var PORT = process.env.PORT || 5000;
_app["default"].listen(PORT, function () {
  console.log("Server is listening on port ".concat(PORT, "..."));
});