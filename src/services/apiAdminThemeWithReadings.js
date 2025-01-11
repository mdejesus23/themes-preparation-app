import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function getAdminThemesWithReadings(themeId) {
  try {
    const response = await api.get(`/api/v1/admin/themes/${themeId}/readings`);
    return response.data.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function postAddReading({ themeId, data }) {
  try {
    const response = await api.post(
      `/api/v1/admin/themes/${themeId}/readings`,
      data,
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function deleteReading(id) {
  try {
    const response = await api.delete(`/api/v1/readings/${id}`);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
