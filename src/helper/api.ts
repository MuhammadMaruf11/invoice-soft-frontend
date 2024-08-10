import axios from "axios";
import { redirect } from "react-router-dom";

const accessToken = localStorage.getItem("token");

export const PublicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const PrivateAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: accessToken,
  },
});

PrivateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      redirect("/user/login");
    }
    return Promise.reject(error);
  }
);
