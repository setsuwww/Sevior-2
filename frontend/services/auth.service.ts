import axios, { AxiosInstance } from "axios";
import { AuthResponse, RefreshResponse } from "@/types/Auth"
import { LoginFormValues, ForgotPasswordFormValues } from "@/validators/auth.validators";

const API_URL = "http://localhost:8080/auth";

export const authApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // IMPORTANT: Allows HttpOnly cookies to be sent
});

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  // In a real app, you might use Zustand or a similar store to get the token,
  // but since we want this modular, we can rely on a global state or let the hook handle it.
  // For simplicity, we can get it from localStorage (only access token, not refresh token).
  // Wait, the user specifically requested not to use localStorage for tokens.
  // We'll manage it in memory via AuthProvider.
  // We'll export a function to set the token on the API instance.
  return config;
}, (error) => Promise.reject(error));

export const setAccessToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await authApi.post<RefreshResponse>("/refresh");
        setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);
        originalRequest.headers["Authorization"] = "Bearer " + data.accessToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Dispatch event or callback to logout user
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    const response = await authApi.post<AuthResponse>("/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await authApi.post("/logout");
    setAccessToken(null);
  },

  registerClient: async (data: any): Promise<AuthResponse> => {
    const response = await authApi.post<AuthResponse>("/register/client", data);
    return response.data;
  },

  registerAgency: async (data: any): Promise<AuthResponse> => {
    const response = await authApi.post<AuthResponse>("/register/agency", data);
    return response.data;
  },

  refresh: async (): Promise<RefreshResponse> => {
    const response = await authApi.post<RefreshResponse>("/refresh");
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordFormValues): Promise<{ message: string }> => {
    const response = await authApi.post("/forgot-password", data);
    return response.data;
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await authApi.post("/reset-password", { token, password });
    return response.data;
  },

  getMe: async (): Promise<{ user: any }> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
