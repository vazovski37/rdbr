import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddHouseForm from '../components/add-house-form';
import Cta from '../design-system/cta';
import { useAddRealEstate } from '../hooks/useAddRealEstate';
import usePersistedFormData from '../hooks/usePersistedFormData';

interface FormData {
  address: string;
  imageFile: string | null; // Image stored as a base64 string
  region: { id: string; name: string };
  city: { id: string; name: string };
  agent: { id: string; name: string };
  postalCode: string;
  price: string;
  area: string;
  bedrooms: string;
  isRental: string;
  description: string;
}

const AddHouse = () => {
  const navigate = useNavigate();
  const [formData, setFormData, clearFormData] = usePersistedFormData<FormData>('formData', {
    address: '',
    imageFile: null,
    region: { id: '', name: '' },
    city: { id: '', name: '' },
    agent: { id: '', name: '' },
    postalCode: '',
    price: '',
    area: '',
    bedrooms: '',
    isRental: '',
    description: '',
  });

  const { handleAddRealEstate, loading, error } = useAddRealEstate();

  const handleSubmit = () => {
    if (!formData.imageFile) {
      alert('Please upload an image');
      return;
    }

    const blob = base64ToBlob(formData.imageFile); // Convert the base64 string back to a Blob
    const file = new File([blob], 'uploaded_image.jpg', { type: blob.type }); // Convert Blob to File

    const realEstateData = {
      address: formData.address,
      image: file, // Use the File object here
      region_id: parseInt(formData.region.id || '0'), // Ensure valid ID
      description: formData.description,
      city_id: parseInt(formData.city.id || '0'), // Ensure valid ID
      zip_code: formData.postalCode,
      price: parseFloat(formData.price),
      area: parseFloat(formData.area),
      bedrooms: parseInt(formData.bedrooms),
      is_rental: parseInt(formData.isRental),
      agent_id: parseInt(formData.agent.id || '0'), // Ensure valid ID
    };

    handleAddRealEstate(realEstateData);
  };

  const handleFormChange = (updatedData: Partial<FormData>) => {
    setFormData((prev: FormData) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="w-full relative text-[32px] my-[60px] font-medium font-firago text-[#021526] text-center inline-block">
        ლისტინგის დამატება
      </h1>

      <AddHouseForm onFormChange={handleFormChange} formData={formData} />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-row gap-4 justify-end my-[90px] w-[790px]">
        <Cta
          label={'გაუქმება'}
          size="s"
          type="secondary"
          onClick={() => {
            clearFormData();
            navigate('/');
          }}
        />
        <Cta
          label={'დაამატე ლისტინგში'}
          size="s"
          type="primary"
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default AddHouse;
