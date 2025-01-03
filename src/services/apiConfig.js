import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = import.meta.env.VITE_API_URL;
// Set default axios configuration
axios.defaults.baseURL = isProduction ? apiUrl : 'http://localhost:3000';
axios.defaults.withCredentials = true;

// Create an axios instance to ensure consistent settings
const api = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: axios.defaults.withCredentials,
});

export default api;
