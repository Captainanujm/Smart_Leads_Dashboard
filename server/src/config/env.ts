import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  port: parseInt(process.env.PORT || "5000", 10),
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  nodeEnv: process.env.NODE_ENV || "development",
};

if (!env.mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

if (!env.jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

export default env;
