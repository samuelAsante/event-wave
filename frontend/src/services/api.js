import axios from "axios";

const api = axios.create({
  baseURL: "https://event-wave.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  timeoutErrorMessage: "Request timed out - please try again",
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry >= 3) {
      throw error;
    }

    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      originalRequest._retry = (originalRequest._retry || 0) + 1;
      return api(originalRequest);
    }

    const message = error.response?.data?.message || "An error occurred";
    const code = error.response?.status || null; // Capture the error code
    return Promise.reject({ message, code }); // Return both message and code
  }
);

export default api;
