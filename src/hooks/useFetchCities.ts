import { useState, useEffect } from 'react';
import { fetchCities } from '../services/fetchServices';

interface City {
  id: number;
  name: string;
  region_id: number;
}

const useFetchCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const fetchedCities = await fetchCities();
        setCities(fetchedCities);
      } catch (err: any) {
        setError(err.message || 'Error fetching cities');
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  return { cities, loading, error };
};

export default useFetchCities;
