import React, { useState, useEffect } from 'react';
import FormField from '../../design-system/form-fields';
import useAgentModal from '../../hooks/useAgentModal';
import useFetchCities from '../../hooks/useFetchCities';
import useFetchRegions from '../../hooks/useFetchRegions';
import { fetchAgents } from '../../services/agentServices';

interface AddHouseFormProps {
  onFormChange: (updatedData: Partial<FormData>) => void;
  formData: FormData;
}

interface FormData {
  address: string;
  postalCode: string;
  region: { id: string; name: string };
  city: { id: string; name: string };
  price: string;
  area: string;
  bedrooms: string;
  description: string;
  agent: { id: string; name: string };
  imageFile: string | null;
  isRental: string;
}

interface Agent {
  id: number;
  name: string;
  surname: string;
}

const AddHouseForm: React.FC<AddHouseFormProps> = ({ onFormChange, formData }) => {
  const [localFormData, setLocalFormData] = useState<FormData>(formData);
  const [agents, setAgents] = useState<Agent[]>([]);
  const { regions } = useFetchRegions();
  const { cities } = useFetchCities();
  const { openAgentModal, AgentModal } = useAgentModal();

  const [regionName, setRegionName] = useState('');
  const [cityName, setCityName] = useState('');
  const [agentName, setAgentName] = useState('');

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    if (regions.length > 0 && cities.length > 0 && agents.length > 0) {
      updateNames();
    }
  }, [regions, cities, agents, localFormData.region, localFormData.city, localFormData.agent]);

  useEffect(() => {
    onFormChange(localFormData);
  }, [localFormData]);

  const loadAgents = async () => {
    try {
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const updateNames = () => {
    const matchingRegion = regions.find((region) => String(region.id) === String(localFormData.region?.id));
    const matchingCity = cities.find((city) => String(city.id) === String(localFormData.city?.id));
    const matchingAgent = agents.find((agent) => String(agent.id) === String(localFormData.agent?.id));

    setRegionName(matchingRegion ? matchingRegion.name : '');
    setCityName(matchingCity ? matchingCity.name : '');
    setAgentName(matchingAgent ? `${matchingAgent.name} ${matchingAgent.surname}` : '');
  };

  const updateFormData = (key: keyof FormData, value: any) => {
    setLocalFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateFormData('imageFile', e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    updateFormData('imageFile', null);
  };

  const handleRegionChange = (name: string) => {
    const selectedRegion = regions.find((region) => region.name === name);
    if (selectedRegion) {
      updateFormData('region', { id: String(selectedRegion.id), name: selectedRegion.name });
      setRegionName(selectedRegion.name);
    }
  };

  const handleCityChange = (name: string) => {
    const selectedCity = cities.find((city) => city.name === name && city.region_id === parseInt(localFormData.region.id));
    if (selectedCity) {
      updateFormData('city', { id: String(selectedCity.id), name: selectedCity.name });
      setCityName(selectedCity.name);
    }
  };

  const handleAgentChange = (name: string) => {
    const selectedAgent = agents.find((agent) => `${agent.name} ${agent.surname}` === name);
    if (selectedAgent) {
      updateFormData('agent', { id: String(selectedAgent.id), name: `${selectedAgent.name} ${selectedAgent.surname}` });
      setAgentName(`${selectedAgent.name} ${selectedAgent.surname}`);
    }
  };

  return (
    <div className="relative w-[790px] flex flex-col items-start justify-start gap-20 text-left text-base text-gray-100 font-helvetica-neue">
      <div>
        <div className="relative text-[16px] font-medium">გარიგების ტიპი</div>
        <FormField
          type="radio"
          label=""
          isRental={localFormData.isRental === '1'}
          onRadioChange={(value) => {
            const isRentalValue = value ? '1' : '0';
            updateFormData('isRental', isRentalValue);
          }}
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-[22px] w-[790px]">
        <div className="relative text-[16px] font-medium">მდებარეობა</div>
        <div className="flex flex-row flex-wrap gap-5 text-sm text-gray-200 font-firago w-full">
          <FormField
            type="text"
            label="მისამართი"
            placeholder="შეიყვანეთ მისამართი"
            value={localFormData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            isValid={localFormData.address.length > 0}
            errorMessage="მინიმუმ ორი სიმბოლო"
            successMessage="მინიმუმ ორი სიმბოლო"
          />
          <FormField
            type="text"
            label="საფოსტო ინდექსი"
            placeholder="შეიყვანეთ საფოსტო ინდექსი"
            value={localFormData.postalCode}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
            isValid={/^\d+$/.test(localFormData.postalCode)}
            errorMessage="მხოლოდ რიცხვები"
            successMessage="მხოლოდ რიცხვები"
          />
          <FormField
            type="dropdown"
            label="რეგიონი"
            options={regions.map((region) => region.name)}
            onSelect={handleRegionChange}
            value={regionName}
          />
          <FormField
            type="dropdown"
            label="ქალაქი"
            options={cities.filter((city) => city.region_id === parseInt(localFormData.region.id)).map((city) => city.name)}
            onSelect={handleCityChange}
            value={cityName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[22px]">
        <div className="flex flex-col items-start justify-start gap-[22px] w-[790px]">
          <div className="relative text-[16px] font-medium">ბინის დეტალები</div>
          <div className="flex flex-row flex-wrap gap-5 text-sm text-gray-200 font-firago w-full">
            <FormField
              type="text"
              label="ფასი"
              placeholder="შეიყვანეთ ფასი"
              value={localFormData.price}
              onChange={(e) => updateFormData('price', e.target.value)}
              isValid={/^\d+$/.test(localFormData.price)}
              errorMessage="მხოლოდ რიცხვები"
              successMessage="მხოლოდ რიცხვები"
            />
            <FormField
              type="text"
              label="ფართობი"
              placeholder="შეიყვანეთ ფართობი"
              value={localFormData.area}
              onChange={(e) => updateFormData('area', e.target.value)}
              isValid={/^\d+$/.test(localFormData.area)}
              errorMessage="მხოლოდ რიცხვები"
              successMessage="მხოლოდ რიცხვები"
            />
            <FormField
              type="text"
              label="საძინებლების რაოდენობა*"
              placeholder="შეიყვანეთ საძინებლების რაოდენობა"
              value={localFormData.bedrooms}
              onChange={(e) => updateFormData('bedrooms', e.target.value)}
              isValid={/^\d+$/.test(localFormData.bedrooms)}
              errorMessage="მხოლოდ რიცხვები"
              successMessage="მხოლოდ რიცხვები"
            />
          </div>
        </div>

        <FormField
          type="longtext"
          label="აღწერა"
          placeholder="შეიყვანეთ აღწერა"
          value={localFormData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          isValid={localFormData.description.split(' ').length >= 5}
          errorMessage="მინიმუმ ხუთი სიტყვა"
          successMessage="მინიმუმ ხუთი სიტყვა"
        />

        <FormField
          type="image"
          label="ატვირთეთ ფოტო"
          imageUrl={localFormData.imageFile || ''}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
        />
      </div>

      <div className="w-[790px] flex flex-col items-start justify-start gap-[15px]">
        <div className="self-stretch relative uppercase font-medium">აგენტი</div>
        <div className="h-16 flex flex-col items-start justify-start text-sm text-gray-200 font-firago">
          <FormField
            type="dropdown"
            label="აირჩიე"
            options={agents.map((agent) => `${agent.name} ${agent.surname}`)}
            onSelect={handleAgentChange}
            value={agentName}
            onAgentAdd={openAgentModal} // Optional: Open modal to add a new agent
          />
        </div>
      </div>
      <AgentModal />
    </div>
  );
};

export default AddHouseForm;
