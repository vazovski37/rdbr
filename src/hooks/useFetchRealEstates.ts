import { useState, useEffect } from 'react';
import { fetchRealEstates } from '../services/realEstateService';

export interface RealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: string;
  city: {
    id: number;
    name: string;
    region: {
      id: number;
      name: string;
    };
  };
}

export const useFetchRealEstates = () => {
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRealEstates = async () => {
      try {
        const data = await fetchRealEstates();
        setRealEstates(data);
      } catch (error: any) {
        setError('Failed to fetch real estates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadRealEstates();
  }, []);

  return { realEstates, loading, error };
};
