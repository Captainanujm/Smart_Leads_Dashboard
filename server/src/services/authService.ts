import User from "../models/User";
import { IUser } from "../types";
import { generateToken } from "../utils/token";

class AuthService {
  async register(
    name: string,
    email: string,
    password: string,
    role: "admin" | "sales" = "sales"
  ): Promise<{ user: Partial<IUser>; token: string }> {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Email already registered") as Error & {
        statusCode: number;
      };
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({ name, email, password, role });

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: Partial<IUser>; token: string }> {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("Invalid credentials") as Error & {
        statusCode: number;
      };
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error("Invalid credentials") as Error & {
        statusCode: number;
      };
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found") as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export default new AuthService();
