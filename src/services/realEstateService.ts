import api from '../utils/api';

export const fetchRealEstates = async () => {
  try {
    const response = await api.get('/real-estates');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching real estates:', error);
    if (error.response?.status === 401) {
      console.error('Invalid token was provided or none at all.');
    }
    throw error;
  }
};

export const addRealEstate = async (realEstateData: FormData) => {
  try {
    const response = await api.post('/real-estates', realEstateData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensure the header is set for file upload
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error adding real estate:', error);
    throw error;
  }
};


export const fetchRealEstateById = async (id: number) => {
  try {
    const response = await api.get(`/real-estates/${id}`);
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      return Promise.reject(error.response.data.message);  
    }
    return Promise.reject('An unexpected error occurred'); 
  }
};


export const deleteRealEstateById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/real-estates/${id}`);
  } catch (error: any) {
    if (error.response) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject('An unexpected error occurred');
  }
};