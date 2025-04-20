// import app from "./app.js";
// import { HOST, PORT } from "./constants/constants.js";

// app.listen(PORT, () => {
//   console.log(`Server is listening at ${HOST}:${PORT}...`);
// });

// trigger render rebuild
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
