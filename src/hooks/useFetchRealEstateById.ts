import { useState, useEffect } from 'react';
import { fetchRealEstateById } from '../services/realEstateService';

interface RealEstateData {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  city_id: number;
  description: string;
  created_at: string;
  image: string;
  city: {
    id: number;
    name: string;
    region_id: number;
    region: {
      id: number;
      name: string;
    };
  };
  agent_id: number;
  agent: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatar: string;
  };
}

interface UseFetchRealEstateByIdResult {
  data: RealEstateData | null;
  loading: boolean;
  error: string | null;
  refetch: (id: number) => void;
}

const useFetchRealEstateById = (id: number): UseFetchRealEstateByIdResult => {
  const [data, setData] = useState<RealEstateData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRealEstateById(id);
      setData(result);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const refetch = (id: number) => {
    fetchData(id);
  };

  return { data, loading, error, refetch };
};

export default useFetchRealEstateById;
