import React, { useState, useEffect } from 'react';
import FormField from '../../design-system/form-fields/index';
import AddAgent from '../../components/add-agent/index'; 
import { fetchAgents } from '../../services/fetchServices';

interface AddHouseFormProps {
  onFormChange: (data: any) => void;
}

interface FormData {
  address: string;
  postalCode: string;
  region: string;
  city: string;
  price: string;
  area: string;
  bedrooms: string;
  description: string;
  agent: string;
  imageUrl: string;
}

interface Agent {
  id: number;
  name: string;
  surname: string;
}

const AddHouseForm = ({ onFormChange }: AddHouseFormProps) => {
  const [isRental, setIsRental] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    address: '',
    postalCode: '',
    region: '',
    city: '',
    price: '',
    area: '',
    bedrooms: '',
    description: '',
    agent: '',
    imageUrl: '',
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [agents, setAgents] = useState<Agent[]>([]); 

  useEffect(() => {
    loadAgents(); 
  }, []);

  const loadAgents = async () => {
    try {
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const updateFormData = (key: keyof FormData, value: string) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    onFormChange(updatedData);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      updateFormData('imageUrl', result);
      console.log('Image uploaded:', file);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    updateFormData('imageUrl', '');
    console.log('Image deleted');
  };

  const handleAddAgentModal = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="relative w-[790px] flex flex-col items-start justify-start gap-20 text-left text-base text-gray-100 font-helvetica-neue">
      {/* Transaction Type */}
      <div>
        <div className="relative text-[16px] font-medium">გარიგების ტიპი</div>
        <FormField
          type="radio"
          label=""
          isRental={isRental}
          onRadioChange={(value) => {
            setIsRental(value);
            onFormChange({ ...formData, isRental: value });
          }}
        />
      </div>

      {/* Location */}
      <div className="flex flex-col items-start justify-start gap-[22px] w-[790px]">
        <div className="relative text-[16px] font-medium">მდებარეობა</div>
        <div className="flex flex-row flex-wrap gap-5 text-sm text-gray-200 font-firago w-full">
          <FormField
            type="text"
            label="მისამართი"
            placeholder="შეიყვანეთ მისამართი"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            isValid={formData.address.length > 0}
            errorMessage="მინიმუმ ორი სიმბოლო"
            successMessage="მინიმუმ ორი სიმბოლო"
          />
          <FormField
            type="text"
            label="საფოსტო ინდექსი"
            placeholder="შეიყვანეთ საფოსტო ინდექსი"
            value={formData.postalCode}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
            isValid={/^\d+$/.test(formData.postalCode)}
            errorMessage="მხოლოდ რიცხვები"
            successMessage="მხოლოდ რიცხვები"
          />
          <FormField
            type="dropdown"
            label="რეგიონი"
            onAgentAdd={() => {}}
            options={['კახეთი', 'იმერეთი']}
            onSelect={(value) => updateFormData('region', value)}
          />
          <FormField
            type="dropdown"
            label="ქალაქი"
            options={['თელავი', 'ქუთაისი']}
            onSelect={(value) => updateFormData('city', value)}
          />
        </div>
      </div>

      {/* House Details */}
      <div className="flex flex-col gap-[22px]">
        <div className="flex flex-col items-start justify-start gap-[22px] w-[790px]">
          <div className="relative text-[16px] font-medium">ბინის დეტალები</div>
          <div className="flex flex-row flex-wrap gap-5 text-sm text-gray-200 font-firago w-full">
            <FormField
              type="text"
              label="ფასი"
              placeholder="შეიყვანეთ ფასი"
              value={formData.price}
              onChange={(e) => updateFormData('price', e.target.value)}
              isValid={/^\d+$/.test(formData.price)}
              errorMessage="მხოლოდ რიცხვები"
              successMessage="მხოლოდ რიცხვები"
            />
            <FormField
              type="text"
              label="ფართობი"
              placeholder="შეიყვანეთ ფართობი"
              value={formData.area}
              onChange={(e) => updateFormData('area', e.target.value)}
              isValid={/^\d+$/.test(formData.area)}
              errorMessage="მხოლოდ რიცხვები"
              successMessage="მხოლოდ რიცხვები"
            />
            <FormField
              type="text"
              label="საძინებლების რაოდენობა*"
              placeholder="შეიყვანეთ საძინებლების რაოდენობა"
              value={formData.bedrooms}
              onChange={(e) => updateFormData('bedrooms', e.target.value)}
              isValid={/^\d+$/.test(formData.bedrooms)}
              errorMessage="მხოლოდ რიცხვები"
              successMessage="მხოლოდ რიცხვები"
            />
          </div>
        </div>
        <FormField
          type="longtext"
          label="აღწერა"
          placeholder="შეიყვანეთ აღწერა"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          isValid={formData.description.split(' ').length >= 5}
          errorMessage="მინიმუმ ხუთი სიტყვა"
          successMessage="მინიმუმ ხუთი სიტყვა"
        />

        <FormField
          type="image"
          label="ატვირთეთ ფოტო"
          imageUrl={formData.imageUrl}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
        />
      </div>

      {/* Agent Selection */}
      <div className="w-[790px] flex flex-col items-start justify-start gap-[15px]">
        <div className="self-stretch relative uppercase font-medium">აგენტი</div>
        <div className="h-16 flex flex-col items-start justify-start text-sm text-gray-200 font-firago">
          <FormField
            type="dropdown"
            label="აირჩიე"
            options={agents.map(agent => `${agent.name} ${agent.surname}`)} 
            onSelect={(value) => updateFormData('agent', value)}
            onAgentAdd={handleAddAgentModal}  
          />
        </div>
      </div>

      {/* Add Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[1000px] h-[784px]">
            <AddAgent onCancel={handleCloseModal} onAddAgentSuccess={() => { handleCloseModal(); loadAgents(); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHouseForm;
