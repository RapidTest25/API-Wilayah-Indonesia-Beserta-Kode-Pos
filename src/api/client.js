import axios from "axios";

// Create axios instance with base configuration
const client = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
      details: null,
    };

    if (error.response) {
      // Server responded with error
      const { data } = error.response;
      if (data && data.error) {
        customError.message = data.error.message;
        customError.code = data.error.code;
        customError.details = data.error.details;
      }
    } else if (error.request) {
      // Request made but no response
      customError.message = "Unable to connect to server";
      customError.code = "NETWORK_ERROR";
    }

    return Promise.reject(customError);
  },
);

export default client;
