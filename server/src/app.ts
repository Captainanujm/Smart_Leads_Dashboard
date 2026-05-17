import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db";
import env from "./config/env";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors({
  origin: true,
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

if (env.nodeEnv === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
  });
}

const start = async () => {
  // Bind the port FIRST so Render doesn't kill the app while waiting for MongoDB
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
  
  // Then connect to MongoDB
  await connectDB();
};

start();
