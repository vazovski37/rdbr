import api from '../utils/api';

export const fetchRegions = async () => {
  try {
    const response = await api.get('/regions');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching regions:', error);
    if (error.response?.status === 401) {
      console.error('Invalid token was provided or none at all.');
    }
    throw error;
  }
};

export const fetchCities = async () => {
  try {
    const response = await api.get('/cities');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching cities:', error);
    if (error.response?.status === 401) {
      console.error('Invalid token was provided or none at all.');
    }
    throw error;
  }
};
