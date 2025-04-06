import express, { json } from "express";
import cors from "cors";
import { FRONTEND_URL } from "./constants/constants.js";
import errorHandler from "./middlewares/error-handler.middleware.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(json());

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
