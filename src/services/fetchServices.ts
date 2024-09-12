import api from '../utils/api';

export const fetchAgents = async () => {
  try {
    const response = await api.get('/agents');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching agents:', error);
    if (error.response?.status === 401) {
      console.error('Invalid token was provided or none at all.');
    }
    throw error;
  }
};
