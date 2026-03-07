// import axios from "axios";

// const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("token")) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
//   }
//   return req;
// });

// export default API;
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL, // Make sure this is set correctly in your .env
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach token if present
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // No extra spaces
    }
    return req;
  },
  (error) => {
    // Handle request errors
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor: handle errors globally
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      // Log server response errors
      console.error("API Response Error:", error.response.status, error.response.data);

      // Handle 401 (unauthorized) or token expiration
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
      }
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;