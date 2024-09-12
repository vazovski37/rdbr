import api from '../utils/api';

export const addAgent = async (agentData: FormData) => {
  try {
    const response = await api.post('/agents', agentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error adding agent:', error);
    if (error.response?.status === 401) {
      console.error('Invalid token was provided or none at all.');
    } else if (error.response?.status === 422) {
      console.error('Validation error:', error.response.data.errors);
    }
    throw error;
  }
};
