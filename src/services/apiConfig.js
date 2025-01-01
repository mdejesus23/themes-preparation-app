import axios from 'axios';

// Set default axios configuration
axios.defaults.baseURL = 'https://prep-app.onrender.com';
axios.defaults.withCredentials = true;

// Create an axios instance to ensure consistent settings
const api = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: axios.defaults.withCredentials,
});

export default api;
