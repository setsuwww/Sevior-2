"use client";

import { create } from "zustand";
import axios from "axios";


import { PlatformRole } from "@/types/User";

export interface User {
  ID: number;
  FullName: string;
  Email: string;
  Role: PlatformRole;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (token: string, refreshToken: string, user: User) => void;
  resetAuth: () => void;
  restoreAuth: () => Promise<User | null>;
  fetchCurrentUser: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  refreshToken: null,
  user: null,

  setAuth: (token, refreshToken, user) => {
    set({ token, refreshToken, user });
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  resetAuth: () => {
    set({ token: null, refreshToken: null, user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  restoreAuth: async (): Promise<User | null> => {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    let user: User | null = null;

    try {
      const userStr = localStorage.getItem("user");
      if (userStr && userStr !== "undefined") {
        user = JSON.parse(userStr);
      }
    } catch (err) {
      console.warn("Failed to parse user from localStorage", err);
      localStorage.removeItem("user");
    }

    if (token && refreshToken && user) {
      set({ token, refreshToken, user });
      return user; 
    }
    return null;
  },

  fetchCurrentUser: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data || !res.data.user) return null;

      const { ID, FullName, Email, Role } = res.data.user;
      get().setAuth(token, get().refreshToken || "", { ID, FullName, Email, Role });
      return { ID, FullName, Email, Role  };
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      get().resetAuth();
      return null;
    }
  },
}));

export const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
