import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddHouseForm from '../components/add-house-form';
import Cta from '../design-system/cta';

const AddHouse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log('Submitted data:', formData);
  };

  const handleFormChange = (data: any) => {
    setFormData(data); 
  };

  return (
    <div className='flex flex-col justify-center items-center' >
      <h1 className="w-full relative text-[32px] my-[60px] font-medium font-firago text-[#021526] text-center inline-block">ლისტინგის დამატება</h1>
      
      <AddHouseForm onFormChange={handleFormChange} />

      <div className='flex flex-row gap-4 justify-end my-[90px] w-[790px] '>
        <Cta
          label={'გაუქმება'}
          size='s'
          type='secondary'
          onClick={() => navigate('/')}
        />
        <Cta
          label={'დაამატე ლისტინგში'}
          size='s'
          type='primary'
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddHouse;
