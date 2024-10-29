import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function getAdminThemes() {
  try {
    const response = await api.get('http://localhost:3000/api/v1/admin/themes');
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
    const response = await api.post(
      'http://localhost:3000/api/v1/admin/themes',
      data,
    );
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}

export async function updateTheme(data, id) {
  console.log('updateTheme', data, id);
  try {
    const response = await api.patch(
      `http://localhost:3000/api/v1/admin/themes/${id}`,
      data,
    );
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
    const response = await api.delete(
      `http://localhost:3000/api/v1/admin/themes/${id}`,
    );
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
