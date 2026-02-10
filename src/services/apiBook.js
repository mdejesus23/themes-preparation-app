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

export async function getLiturgyById(id) {
  try {
    const response = await api.get(`/api/v1/liturgy-of-hours/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    handleApiError(error);
    throw error;
  }
}

export async function getAllLiturgies(page = 1, season = '', week = '') {
  try {
    let url = `/api/v1/liturgy-of-hours/filter?sort=order&limit=20&page=${page}`;
    if (season) url += `&season=${season}`;
    if (week) url += `&week=${week}`;

    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    handleApiError(error);
    throw error;
  }
}
