import { useState, useEffect } from 'react';
import { fetchRegions } from '../services/fetchServices';

interface Region {
  id: number;
  name: string;
}

const useFetchRegions = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const fetchedRegions = await fetchRegions();
        setRegions(fetchedRegions);
      } catch (err: any) {
        setError(err.message || 'Error fetching regions');
      } finally {
        setLoading(false);
      }
    };

    loadRegions();
  }, []);

  return { regions, loading, error };
};

export default useFetchRegions;
