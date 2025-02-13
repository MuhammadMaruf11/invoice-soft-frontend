import axios from "axios";

const userToken = localStorage.getItem("userToken");
const adminToken = localStorage.getItem("adminToken");

export const PublicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const PrivateAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: userToken,
  },
});

export const AdminAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const AdminPrivateAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: adminToken,
  },
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

// Interceptor to dynamically add Authorization header
AdminPrivateAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("adminToken");
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
    window.open("/user/login", "_self");
    }
    return Promise.reject(error);
  }
);

AdminPrivateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("adminToken");
      window.open("/admin/login",'_self');
    }
    return Promise.reject(error);
  }
);
