import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import moviesRouter from "./routes/movies";
import userRouter from "./routes/users";
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";
app.use(cors());
app.use(express.json());
app.use("/api/movies", moviesRouter);
app.use("/user", userRouter);
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB (sample_mflix)");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

export default app;
