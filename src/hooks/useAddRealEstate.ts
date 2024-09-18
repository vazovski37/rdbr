import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRealEstate } from '../services/realEstateService'; 

interface RealEstateData {
  address: string;
  image: File;  // Image as File
  region_id: number;
  description: string;
  city_id: number;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  agent_id: number;
}

export const useAddRealEstate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddRealEstate = async (realEstateData: RealEstateData) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();  // Use FormData for file upload
    formData.append('address', realEstateData.address);
    formData.append('image', realEstateData.image);
    formData.append('region_id', realEstateData.region_id.toString());
    formData.append('description', realEstateData.description);
    formData.append('city_id', realEstateData.city_id.toString());
    formData.append('zip_code', realEstateData.zip_code);
    formData.append('price', realEstateData.price.toString());
    formData.append('area', realEstateData.area.toString());
    formData.append('bedrooms', realEstateData.bedrooms.toString());
    formData.append('is_rental', realEstateData.is_rental.toString());
    formData.append('agent_id', realEstateData.agent_id.toString());

    try {
      const response = await addRealEstate(formData);
      console.log('Real estate created:', response);

      alert('Real estate added successfully!');
      navigate('/');
    } catch (err: any) {
      console.error('Error adding real estate:', err);
      setError('An error occurred while adding real estate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleAddRealEstate, loading, error };
};
