import axios from 'axios';

export async function getAdminThemes() {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/v1/admin/themes',
    );
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    // You can throw the error or return an error message
    throw error;
  }
}

export async function deleteTheme(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/admin/themes/${id}`,
    );
    // console.log(response.data);
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching data:', error); // Handle error
    // You can throw the error or return an error message
    throw error;
  }
}
