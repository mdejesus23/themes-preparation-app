import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

export async function getBookById(bookId) {
  try {
    const response = await api.get(`/api/v1/books/${bookId}`);

    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    handleApiError(error);
    throw error;
  }
}
