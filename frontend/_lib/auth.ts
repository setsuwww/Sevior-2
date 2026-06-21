import axios from "axios";
import { useAuthStore, User } from "@/_stores/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface LoginData {
  email: string;
  password: string;
  agree: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  agree: boolean;
}

export const authService = {
  login: async (data: LoginData) => {
    const res = await axios.post(`${API_URL}/login`, data);

    const { token, user } = res.data;
    localStorage.setItem("token", token);

    useAuthStore.getState().setAuth(token, user as User);
    return res.data;
  },

  register: async (data: RegisterData) => {
    return axios.post(`${API_URL}/register`, data);
  },

  logout: () => {
    useAuthStore.getState().resetAuth();
  },

  getAuthHeader: () => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.data || !res.data.user) return null;

    return res.data.user;
  } catch (err) {
    console.error("Failed to fetch current user:", err);
    return null;
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};
