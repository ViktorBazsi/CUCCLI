import express, { json } from "express";
import cors from "cors";
import { FRONTEND_URL } from "./constants/constants.js";
import errorHandler from "./middlewares/error-handler.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import personRoutes from "./routes/person.routes.js";
import dateRoutes from "./routes/date.routes.js";
import performanceRoutes from "./routes/performance.routes.js";
import likeRoutes from "./routes/like.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import ratingRoutes from "./routes/rating.routes.js"

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/person", personRoutes);
app.use("/api/date", dateRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/rating", ratingRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
