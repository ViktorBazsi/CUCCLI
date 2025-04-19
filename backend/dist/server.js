// import app from "./app.js";
// import { HOST, PORT } from "./constants/constants.js";

// app.listen(PORT, () => {
//   console.log(`Server is listening at ${HOST}:${PORT}...`);
// });

// trigger render rebuild
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is listening on port ".concat(PORT, "..."));
});