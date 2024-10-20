function handleApiError(error) {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error('Server Error:', error.response.data);
  } else if (error.request) {
    // Request was made but no response was received
    console.error('Network Error: No response received:', error.request);
  } else {
    // Something else happened in setting up the request
    console.error('Error:', error.message);
  }
}

export default handleApiError;
