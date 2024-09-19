import React, { useState, useEffect } from 'react';
import FormField from '../../design-system/form-fields/index';
import { fetchAgents } from '../../services/agentServices';
import useFetchRegions from '../../hooks/useFetchRegions';
import useFetchCities from '../../hooks/useFetchCities';
import useAgentModal from '../../hooks/useAgentModal'; // Import the custom hook

interface AddHouseFormProps {
  onFormChange: (data: any) => void;
}

interface FormData {
  address: string;
  postalCode: string;
  region: number | null;
  city: number | null;
  price: string;
  area: string;
  bedrooms: string;
  description: string;
  agent: number | null;
  imageFile: File | null;
  isRental: string;
}

interface Agent {
  id: number;
  name: string;
  surname: string;
}

const AddHouseForm = ({ onFormChange }: AddHouseFormProps) => {
  const initialFormData = JSON.parse(localStorage.getItem('formData') || '{}'); // Get formData from localStorage or set default
  const [formData, setFormData] = useState<FormData>({
    address: initialFormData.address || '',
    postalCode: initialFormData.postalCode || '',
    region: initialFormData.region || null,  // Initialize as number or null
    city: initialFormData.city || null,      // Initialize as number or null
    price: initialFormData.price || '',
    area: initialFormData.area || '',
    bedrooms: initialFormData.bedrooms || '',
    description: initialFormData.description || '',
    agent: initialFormData.agent || null,    // Initialize as number or null
    imageFile: null,                         // Files can't be stored in localStorage
    isRental: initialFormData.isRental || '1', // Initialize as '1' for rental by default
  });

  const [agents, setAgents] = useState<Agent[]>([]);
  const { regions } = useFetchRegions();
  const { cities } = useFetchCities();
  const { openAgentModal, AgentModal } = useAgentModal();
  
  const [regionName, setRegionName] = useState("");
  const [cityName, setCityName] = useState("");
  const [agentName, setAgentName] = useState("");

  // Fetch Agents, Regions, and Cities
  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    if (regions.length > 0 && cities.length > 0 && agents.length > 0) {
      const matchingRegion = regions.find(region => region.id === formData.region);
      const matchingCity = cities.find(city => city.id === formData.city);
      const matchingAgent = agents.find(agent => agent.id === formData.agent);

      if (matchingRegion) setRegionName(matchingRegion.name);
      if (matchingCity) setCityName(matchingCity.name);
      if (matchingAgent) setAgentName(`${matchingAgent.name} ${matchingAgent.surname}`);
    }
  }, [regions, cities, agents, formData.region, formData.city, formData.agent]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const loadAgents = async () => {
    try {
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const updateFormData = (key: keyof FormData, value: any) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    onFormChange(updatedData);
  };

  const handleImageUpload = (file: File) => {
    updateFormData('imageFile', file);
  };

  const handleImageDelete = () => {
    updateFormData('imageFile', null);
  };

  const handleRegionChange = (name: string) => {
    const selectedRegion = regions.find(region => region.name === name);
    if (selectedRegion) {
      updateFormData('region', selectedRegion.id);  
      setRegionName(selectedRegion.name); // Set region name for display
    }
  };

  const handleCityChange = (name: string) => {
    const selectedCity = cities.find(city => city.name === name);
    if (selectedCity) {
      updateFormData('city', selectedCity.id); 
      setCityName(selectedCity.name); // Set city name for display
    }
  };

  const handleAgentChange = (name: string) => {
    const selectedAgent = agents.find(agent => `${agent.name} ${agent.surname}` === name);
    if (selectedAgent) {
      updateFormData('agent', selectedAgent.id);
      setAgentName(`${selectedAgent.name} ${selectedAgent.surname}`); // Set agent name for display
    }
  };

  return (
    <div className="relative w-[790px] flex flex-col items-start justify-start gap-20 text-left text-base text-gray-100 font-helvetica-neue">
      {/* Transaction Type */}
      <div>
        <div className="relative text-[16px] font-medium">გარიგების ტიპი</div>
        <FormField
          type="radio"
          label=""
          isRental={formData.isRental === '1'}
          onRadioChange={(value) => {
            const isRentalValue = value ? '1' : '0';
            updateFormData('isRental', isRentalValue);
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
            options={regions.map(region => region.name)}
            onSelect={handleRegionChange}
            value={regionName || ''}
          />
          <FormField
            type="dropdown"
            label="ქალაქი"
            options={cities.filter(city => city.region_id === formData.region).map(city => city.name)}
            onSelect={handleCityChange}
            value={cityName || ''}
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

        {/* Description */}
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

        {/* Image Upload */}
        <FormField
          type="image"
          label="ატვირთეთ ფოტო"
          imageUrl={formData.imageFile ? URL.createObjectURL(formData.imageFile) : ''}
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
            onSelect={handleAgentChange}
            value={agentName || ''}
          />
        </div>
      </div>

      {/* Add Agent Modal */}
      <AgentModal />
    </div>
  );
};

export default AddHouseForm;
