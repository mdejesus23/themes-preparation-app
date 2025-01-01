import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// Set default axios configuration
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

// Create an axios instance to ensure consistent settings
const api = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: axios.defaults.withCredentials,
});

export default api;
