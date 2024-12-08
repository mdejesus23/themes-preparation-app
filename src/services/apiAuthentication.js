import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function postCreateUser(data) {
  try {
    const response = await api.post(`/api/v1/users/signup`, data);
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
}

export async function postLoginUser(data) {
  try {
    const response = await api.post(`/api/v1/users/login`, data);
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
}

export async function postLogoutUser() {
  try {
    const response = await api.post(`/api/v1/users/logout`);
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get(`/api/v1/users/me`);
    console.log('API Response in getCurrentUser:', response.data.data); // Should log user data
    return response.data.data; // Return the user data
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    throw error; // Ensure errors propagate to React Query
  }
}
