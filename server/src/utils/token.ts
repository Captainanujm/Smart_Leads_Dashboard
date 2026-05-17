import jwt from "jsonwebtoken";
import env from "../config/env";
import { TokenPayload } from "../types";

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.jwtSecret) as TokenPayload;
};
