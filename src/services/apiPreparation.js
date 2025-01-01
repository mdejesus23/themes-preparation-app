import api from './apiConfig';
import handleApiError from '../utils/handleApiError';

// Get preparation themes
export async function getPrepThemes() {
  try {
    const response = await api.get(`/api/v1/preparation/themes`);
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error); // Handle error with custom function
    throw error; // Rethrow the error for further handling
  }
}

// Post access theme with themeId and passcode
export async function postAccessTheme({ themeId, passcode }) {
  try {
    const response = await api.post(
      `/api/v1/preparation/themes/${themeId}/readings`,
      { passcode },
    );
    return response.data; // Return the data if needed
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// Vote for a reading
export async function voteReading(readingId) {
  try {
    const response = await api.post(
      `/api/v1/preparation/vote-reading/${readingId}`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function getThemeWithReadingsAndVotes(themeId) {
  try {
    const response = await api.get(
      `/api/v1/preparation/theme/${themeId}/reading-votes`,
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
