import React, { useState } from 'react';

interface TextFieldProps {
  label?: string;
  type?: 'text' | 'longtext' | 'dropdown';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isValid?: boolean;
  onAgentAdd?: () => void;
  className?: string;
}

const TextField = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  isValid = true,
  onAgentAdd,
  className = '',
}: TextFieldProps) => {
  const [hasTyped, setHasTyped] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasTyped(true);
    if (onChange) onChange(e);
  };

  return (
    <div className={`relative w-full flex flex-col items-start justify-start gap-1 text-left text-sm text-gray font-firago ${className}`}>
      {/* Label */}
      {label && <label className="self-stretch relative font-medium mb-1">{label} *</label>}

      {/* Input Field */}
      {type === 'text' && (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-96 p-2.5 rounded-md border-[1px] border-solid ${
            !hasTyped ? 'border-lightslategray' : isValid ? 'border-forestgreen' : 'border-orangered'
          } focus:outline-none`}
        />
      )}

      {/* Helper or Validation Text */}
      {type === 'text' && (
        <div className={`flex flex-row items-center justify-start gap-[7px] `}>
          <img className="w-2.5 h-[8.2px]" alt="" src="Vector.svg" />
          <div
            className={`relative ${
              hasTyped && !isValid ? 'text-orangered' : isValid ? 'text-forestgreen' : 'border-lightslategray'
            } `}
          >
            {!hasTyped ? 'მინიმუმ ორი სიმბოლო' : isValid ? 'მინიმუმ ორი სიმბოლო' : 'ჩაწერეთ ვალიდური მონაცემები'}
          </div>
        </div>
      )}

      {/* TextArea (Long Text) Field */}
      {type === 'longtext' && (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-96 p-2.5 rounded-md border-[1px] border-solid ${
            !hasTyped ? 'border-lightslategray' : isValid ? 'border-forestgreen' : 'border-orangered'
          } focus:outline-none resize-none`}
          rows={5} // Default rows for textarea
        />
      )}

      {/* Dropdown Field */}
      {type === 'dropdown' && (
        <div className="relative w-full">
          {/* Dropdown Button */}
          <div className="w-96 p-2.5 rounded-t-md border-lightslategray border-[1px] border-solid flex justify-between items-center cursor-pointer">
            <span>{value || placeholder}</span>
            <img src="Icon.svg" alt="Dropdown Icon" className="w-3.5 h-3.5" />
          </div>

          {/* Dropdown Options */}
          <div className="w-96 border border-t-0 border-lightslategray rounded-b-md">
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={onAgentAdd}
            >
              <img className="w-6 h-6 inline-block mr-2" src="plus-circle.svg" alt="Add Icon" />
              დაამატე აგენტი
            </div>
            {['იმერეთი', 'სამეგრელო', 'გურია'].map((region, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer border-t border-gray-200"
              >
                {region}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextField;
