import api from "./axios";
import { ApiResponse, User } from "../types";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post<ApiResponse<User>>("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post<ApiResponse<User>>("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<ApiResponse<User>>("/auth/me");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post<ApiResponse>("/auth/logout");
  return res.data;
};
