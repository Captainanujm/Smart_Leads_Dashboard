import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: string;
      };
    }
  }
}

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    req.user = { _id: user._id.toString(), role: user.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
