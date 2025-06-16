import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function postUpdatePassword(data) {
  try {
    const response = await api.patch(`/api/v1/users/updateMyPassword`, data);
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}

export async function userResetVotes() {
  try {
    const response = await api.post(`/api/v1/users/reset-votes`);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function uploadProfileImage(formData) {
  try {
    const response = await api.patch(
      '/api/v1/users/upload-profile-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
