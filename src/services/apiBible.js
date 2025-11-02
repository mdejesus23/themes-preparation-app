import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function getBibleReadings(verse) {
  try {
    // Use a different endpoint only for this request
    const response = await api.get(`/api/v1/bible/${verse}`);

    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
