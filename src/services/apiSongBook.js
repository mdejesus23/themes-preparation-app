import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

// Get preparation themes
export async function getSongBook() {
  try {
    const response = await api.get(`/api/v1/songs?sort=title`);
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}

export async function getSong(songId) {
  try {
    const response = await api.get(`/api/v1/songs/${songId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
