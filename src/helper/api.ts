import axios from "axios";
import { redirect } from "react-router-dom";

export const PublicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const PrivateAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor to dynamically add Authorization header
PrivateAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("userToken");
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

PrivateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("userToken");
      redirect("/user/login");
    }
    return Promise.reject(error);
  }
);
