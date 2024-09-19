import { useState, useEffect } from 'react';

const usePersistedFormData = (key: string, initialValue: any) => {
  const [formData, setFormData] = useState(() => {
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
