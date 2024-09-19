import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddHouseForm from '../components/add-house-form';
import Cta from '../design-system/cta';
import { useAddRealEstate } from '../hooks/useAddRealEstate';
import usePersistedFormData from '../hooks/usePersistedFormData'; 

const AddHouse = () => {
  const navigate = useNavigate();
  const [formData, setFormData, clearFormData] = usePersistedFormData('formData', {});
  const { handleAddRealEstate, loading, error } = useAddRealEstate(); 

  const handleSubmit = () => {
    const realEstateData = {
      address: formData.address,
      image: formData.imageFile,
      region_id: parseInt(formData.region),
      description: formData.description,
      city_id: parseInt(formData.city),
      zip_code: formData.postalCode,
      price: parseFloat(formData.price),
      area: parseFloat(formData.area),
      bedrooms: parseInt(formData.bedrooms),
      is_rental: parseInt(formData.isRental),
      agent_id: parseInt(formData.agent),
    };

    handleAddRealEstate(realEstateData);
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="w-full relative text-[32px] my-[60px] font-medium font-firago text-[#021526] text-center inline-block">ლისტინგის დამატება</h1>

      <AddHouseForm onFormChange={handleFormChange} />

      {error && <p className="text-red-500">{error}</p>}

      <div className='flex flex-row gap-4 justify-end my-[90px] w-[790px]'>
        <Cta
          label={'გაუქმება'}
          size='s'
          type='secondary'
          onClick={() => {
            clearFormData();
            navigate('/');
          }}
        />
        <Cta
          label={'დაამატე ლისტინგში'}
          size='s'
          type='primary'
          onClick={handleSubmit}
          disabled={loading} 
        />
      </div>
    </div>
  );
};

export default AddHouse;
