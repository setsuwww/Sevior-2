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
};
