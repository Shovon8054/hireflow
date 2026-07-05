import axios from "axios";

// In production (Vercel), VITE_API_URL = "/api" → proxied through Vercel to Render (no CORS)
// In development, falls back to localhost:8080/api directly
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true
});

export default api;