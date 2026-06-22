import axios from "axios";
import { useAuthStore } from "@/_stores/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
      if (!refreshToken) {
        useAuthStore.getState().resetAuth();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = data.accessToken;
        
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", newAccessToken);
        }
        
        useAuthStore.setState({ token: newAccessToken });
        
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        
        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().resetAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
