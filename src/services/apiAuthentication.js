import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function postCreateUser(data) {
  try {
    const response = await api.post(`/api/v1/users/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Error:', error); // Debugging line
    throw error;
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
    return response.data.data.data; // Return the user data
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    throw error; // Ensure errors propagate to React Query
  }
}

export async function postForgotPassword(data) {
  try {
    const response = await api.post(`/api/v1/users/forgotPassword`, data);
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}

export async function postResetPassword({ data, token }) {
  try {
    const response = await api.patch(
      `/api/v1/users/resetPassword/${token}`,
      data,
    );
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}
