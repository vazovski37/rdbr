// src/design-system/checkbox.tsx

import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Properly type the event parameter
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 rounded-sm border-gainsboro border-[1px] border-solid cursor-pointer accent-forestgreen"
    />
  );
};

export default Checkbox;
