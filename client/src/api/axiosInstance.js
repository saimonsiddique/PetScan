import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data, // Return data directly on success
  (error) => {
    if (error.response && error.response.data) {
      // Prefer server-provided message, or a generic one
      // Ensure that data.msg or data.message exists, otherwise provide a fallback.
      let message = 'An API error occurred';
      if (error.response.data.msg) {
        message = error.response.data.msg;
      } else if (error.response.data.message) {
        message = error.response.data.message;
      } else if (typeof error.response.data === 'string') {
        // Sometimes the error is just a string
        message = error.response.data;
      }
      return Promise.reject(message);
    } else if (error.request) {
      return Promise.reject('Network error: No response received from server.');
    } else {
      return Promise.reject(error.message || 'An unexpected error occurred.');
    }
  }
);

export default axiosInstance;
