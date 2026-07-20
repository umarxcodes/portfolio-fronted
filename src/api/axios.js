import axios from "axios";
import { env } from "@/config/env";
import { tokenStorage } from "@/lib/token";
import { ApiError } from "@/lib/errorHandler";

export const SESSION_EXPIRED_EVENT = "portfolio:session-expired";

const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: "application/json",
  },
  // We handle retries manually at the query layer; disable axios auto-retry.
  withCredentials: false,
});

// Attach bearer token to every request when present.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Normalize the backend envelope: extract `data`, convert failures to ApiError.
axiosInstance.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && body.success === false) {
      return Promise.reject(
        new ApiError({
          status: response.status,
          message: body.message || "Request failed",
          errors: body.errors || [],
          data: body.data || null,
        })
      );
    }
    return response;
  },
  (error) => {
    const resp = error.response;
    const body = resp?.data || {};

    if (resp?.status === 401) {
      tokenStorage.clear();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
      }
    }

    return Promise.reject(
      new ApiError({
        status: resp?.status || 0,
        message: body.message || error.message || "Network error",
        errors: body.errors || [],
        data: body.data || null,
      })
    );
  }
);

export default axiosInstance;
