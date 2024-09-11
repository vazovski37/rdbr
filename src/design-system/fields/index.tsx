import React, { useState } from 'react';

interface TextFieldProps {
  label?: string;
  type?: 'text' | 'longtext' | 'dropdown';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isValid?: boolean;
  onAgentAdd?: () => void; // Function to trigger when 'დაამატე აგენტი' is clicked
  className?: string; // Additional classes
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
  const [hasTyped, setHasTyped] = useState(false); // Track if the user has started typing

  // Helper function to handle change and set hasTyped
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasTyped(true); // User has started typing
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

      {/* Render validation or helper message */}
      {type === 'text' && hasTyped && (
        <div className={`flex flex-row items-center justify-start gap-[7px] ${isValid ? 'text-forestgreen' : 'text-orangered'}`}>
          <img className="w-2.5 h-[8.2px]" alt="" src="Vector.svg" />
          <div className={`relative ${isValid ? 'text-forestgreen' : 'text-orangered'} `}>{isValid ? 'მინიმუმ ორი სიმბოლო' : 'ჩაწერეთ ვალიდური მონაცემები'}</div>
        </div>
      )}
    </div>
  );
};

export default TextField;
