import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const usePersistedFormData = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [formData, setFormData] = useState<T>(() => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(formData));
  }, [key, formData]);

  const clearFormData = () => {
    localStorage.removeItem(key);
    setFormData(initialValue);
  };

  return [formData, setFormData, clearFormData];
};

export default usePersistedFormData;
