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

// Get preparation themes
export async function getCurrentUser() {
  try {
    const response = await api.get(`/api/v1/users`);
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}
