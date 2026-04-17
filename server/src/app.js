import express from "express";
import cors from "cors";
import problemRoutes from "./routes/problemRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.use("/api/problems", problemRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
