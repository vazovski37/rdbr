import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRealEstateById } from '../services/realEstateService';

export const useDeleteRealEstate = (id: number) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteRealEstate = async () => {
    try {
      setIsDeleting(true);
      await deleteRealEstateById(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting real estate:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteRealEstate, isDeleting };
};
