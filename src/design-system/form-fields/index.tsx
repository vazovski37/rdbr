import React, { useState } from 'react';

interface FormFieldProps {
  label?: string;
  type?: 'text' | 'longtext' | 'dropdown' | 'image' | 'radio';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isValid?: boolean;
  onAgentAdd?: () => void;
  className?: string;
  options?: string[];
  onSelect?: (option: string) => void;
  imageUrl?: string;
  onImageUpload?: (file: File) => void;
  onImageDelete?: () => void;
  isRental?: boolean; 
  onRadioChange?: (isRental: boolean) => void;
}


const FormField = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  isValid = true,
  onAgentAdd,
  className = '',
  options,
  onSelect,
  imageUrl,
  isRental = true,
  onImageUpload,
  onImageDelete, // Function for deleting the image
  onRadioChange,
}: FormFieldProps) => {
  const [hasTyped, setHasTyped] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedRadio, setSelectedRadio] = useState<boolean>(isRental); 


  const handleRadioChange = (value: boolean) => {
    setSelectedRadio(value);
    if (onRadioChange) {
      onRadioChange(value); 
    }
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasTyped(true);
    if (onChange) onChange(e);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setDropdownOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (onImageUpload) {
        onImageUpload(e.target.files[0]);
      }
    }
  };

  return (
    <div className={`relative w-full flex flex-col items-start justify-start gap-1 text-left text-sm text-gray font-firago ${className}`}>

      {label && <label className="self-stretch text-[#021526] relative font-medium mb-1">{label} *</label>}

      {type === 'text' && (
        <>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-96 text-[#021526] p-2.5 rounded-md border-[1px] border-solid ${
            !hasTyped ? 'border-lightslategray' : isValid ? 'border-forestgreen' : 'border-orangered'
          } focus:outline-none`}
          />
        <div className="flex flex-row items-center justify-start gap-[7px]">
          <span className={`material-symbols-outlined ${hasTyped && !isValid ? 'text-orangered' : isValid ? 'text-forestgreen' : 'border-lightslategray'}`}>check</span>
          <div className={`relative ${hasTyped && !isValid ? 'text-orangered' : isValid ? 'text-forestgreen' : 'border-lightslategray'}`}>
            {hasTyped ? (isValid ? 'მინიმუმ ორი სიმბოლო' : 'ჩაწერეთ ვალიდური მონაცემები') : 'მინიმუმ ორი სიმბოლო'}
          </div>
        </div>
        </>
      )}

      {type === 'longtext' && (
        <>
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={`w-96 p-2.5 rounded-md text-[#021526] border-[1px] border-solid ${
              !hasTyped ? 'border-lightslategray' : isValid ? 'border-forestgreen' : 'border-orangered'
            } focus:outline-none resize-none`}
            rows={5}
          />
        <div className="flex flex-row items-center justify-start gap-[7px]">
          <span className={`material-symbols-outlined ${hasTyped && !isValid ? 'text-orangered' : isValid ? 'text-forestgreen' : 'border-lightslategray'}`}>check</span>
          <div className={`relative ${hasTyped && !isValid ? 'text-orangered' : isValid ? 'text-forestgreen' : 'border-lightslategray'}`}>
            {hasTyped ? (isValid ? 'მინიმუმ ორი სიმბოლო' : 'ჩაწერეთ ვალიდური მონაცემები') : 'მინიმუმ ორი სიმბოლო'}
          </div>
        </div>
        </>
      )}

      {type === 'dropdown' && (
        <div className="relative w-full text-[#021526]">
          {/* Dropdown Button */}
          <div
            className={`w-96 p-2.5 rounded-md border-[1px] border-solid border-lightslategray flex justify-between items-center cursor-pointer ${
              isDropdownOpen ? 'rounded-b-none border-b-0' : 'rounded-md'
            }`}
            onClick={toggleDropdown}
          >
            <span>{selectedValue || placeholder}</span>
            <span className={`material-symbols-outlined text-[#021526] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
              expand_more
            </span>
          </div>

          {/* Dropdown Options */}
          {isDropdownOpen && (
            <div className="absolute w-96 rounded-b-md mt-0 bg-white shadow-lg z-10">
              {/* Agent Add Option */}
              {onAgentAdd && (
                <div className="w-full bg-white border-[1px] border-solid border-lightslategray p-2.5 hover:bg-gray-100 cursor-pointer flex items-center" onClick={onAgentAdd}>
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="ml-2">დაამატე აგენტი</span>
                </div>
              )}
              {/* Dropdown Options Mapping */}
              {options?.map((option, index) => (
                <div
                  key={index}
                  className={`w-full border-[1px] bg-white border-solid border-t-0 border-lightslategray p-2.5 hover:bg-gray-100 cursor-pointer flex items-center ${
                    index === options.length - 1 ? 'rounded-b-md' : ''
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <div className="relative">{option}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {type === 'image' && (
        <div className="w-full relative rounded-lg bg-white border-darkslategray border-[1px] border-dashed box-border h-[140px] cursor-pointer">
          {!imageUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Invisible file input to trigger upload on click anywhere within the div */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {/* Clickable Circle Icon for Upload */}
              <span 
                className="material-symbols-outlined text-2xl z-10 cursor-pointer"
                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
              >
                add_circle_outline
              </span>
            </div>
          ) : (
            <div className="w-full relative rounded-lg h-[140px] flex items-center justify-center">
              <div className="relative">
                <img
                  className="h-[82px] w-auto rounded-lg"
                  alt="Uploaded"
                  src={imageUrl}
                />
                <button
                  type="button"
                  onClick={onImageDelete} 
                  className="absolute cursor-pointer bottom-0 right-0 p-1 bg-white border border-gray-300 rounded-full shadow-md translate-x-1/2 translate-y-1/2"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {type === 'radio' && (
        <div className="flex gap-6 mt-4">
          <label className="flex items-center cursor-pointer p-2 rounded-md">
            <input
              type="radio"
              name="transactionType"
              value="rent"
              checked={selectedRadio}
              onChange={() => handleRadioChange(true)}
              className="form-radio accent-black mr-2" 
            />
            <span className="text-sm text-black">ქირავდება</span>
          </label>

          <label className="flex items-center cursor-pointer p-2 rounded-md">
            <input
              type="radio"
              name="transactionType"
              value="sale"
              checked={!selectedRadio}
              onChange={() => handleRadioChange(false)}
              className="form-radi accent-black mr-2" 
            />
            <span className="text-sm text-black">იყიდება</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default FormField;
