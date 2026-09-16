import axios from "axios";

// In production (Vercel), VITE_API_URL = "/api" → proxied through Vercel to Render (no CORS)
// In development, falls back to localhost:5000/api directly
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export default api;