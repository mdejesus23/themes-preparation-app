import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function getAdminThemes() {
  try {
    const response = await api.get('/api/v1/admin/themes');
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function postTheme(data) {
  try {
    const response = await api.post('/api/v1/admin/themes', data);
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function updateTheme(data, id) {
  try {
    const response = await api.patch(`/api/v1/admin/themes/${id}`, data);
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function deleteTheme(id) {
  try {
    const response = await api.delete(`/api/v1/admin/themes/${id}`);
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function createPrepResult(data) {
  try {
    const response = await api.post('/api/v1/results', data);
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function updatePrepResult(data, id) {
  try {
    const response = await api.patch(`/api/v1/results/${id}`, data);
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function deleteResult(id) {
  try {
    const response = await api.delete(`/api/v1/results/${id}`);
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function getAdminResults() {
  try {
    const response = await api.get('/api/v1/results');
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function resetVotes(themeId) {
  try {
    const response = await api.post(
      `/api/v1/admin/themes/${themeId}/readings/reset-votes`,
    );
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
