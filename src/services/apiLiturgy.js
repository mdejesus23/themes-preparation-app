import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function getLiturgicalCalendar() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  try {
    const response = await api.get(`/api/v1/liturgy/${year}/${month}/${day}`);

    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
