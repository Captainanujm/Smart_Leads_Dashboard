import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import env from "./config/env";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running", uptime: process.uptime() });
});

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

start();
