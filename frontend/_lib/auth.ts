import { useAuthStore } from "@/_stores/auth";
import { axiosInstance } from "./axiosInstance";

export interface LoginData {
  email: string;
  password: string;
  agree: boolean;
}

export const authService = {
  login: async (data: LoginData) => {
    const res = await axiosInstance.post(`/auth/login`, data);

    const { accessToken, refreshToken, user } = res.data;

    useAuthStore.getState().setAuth(accessToken, refreshToken, user);
    return res.data;
  },

  logout: () => {
    useAuthStore.getState().resetAuth();
  },

  getAuthHeader: () => {
    // Adding logging as requested
    const token = useAuthStore.getState().token;
    console.log("TOKEN in getAuthHeader:", token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    console.log("AUTH HEADER:", headers);
    return headers;
  },
};
