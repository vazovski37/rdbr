import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api',
  headers: {
    Authorization: `Bearer 9cfeb76f-e474-4804-919f-0632cc3a3dac`,
    'Content-Type': 'application/json', 
  },
});

export default api;