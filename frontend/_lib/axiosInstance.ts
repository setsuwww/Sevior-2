import axios, { AxiosInstance } from "axios";
import { RefreshResponse } from "@/types/Auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authApi: AxiosInstance = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
  timeout: 10000,
});

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
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

export const setAccessToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else { delete api.defaults.headers.common.Authorization }
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization =
              `Bearer ${token}`;

            return api(originalRequest);
          })
          .catch((err) =>
            Promise.reject(err)
          );
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } =
          await authApi.post<RefreshResponse>("/refresh");

        setAccessToken(data.accessToken);

        processQueue(
          null, data.accessToken
        );

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      }
      catch (err) {
        processQueue(err, null);

        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new Event("auth:logout")
          );
        }

        return Promise.reject(err);
      }
      finally { isRefreshing = false; }
    }

    return Promise.reject(error);
  }
);
