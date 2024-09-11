import React, { useState } from 'react';
import Dropdown from '../../design-system/filter-item';

const Filter = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // State to track which dropdown is open

  // Function to handle opening a dropdown
  const handleDropdownClick = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle the dropdown open/close
  };

  return (
    <div className="relative rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border w-max flex flex-row items-center justify-start p-1.5 gap-6 text-center text-base text-gray font-firago">
      {Array.from({ length: 4 }).map((_, index) => (
        <Dropdown
          key={index}
          label={`Options ${index + 1}`}
          isOpen={openDropdown === index}
          onClick={() => handleDropdownClick(index)}
        >
          <Contentt />
        </Dropdown>
      ))}
    </div>
  );
};

// Content to be displayed in the dropdown
const Contentt = () => {
  return (
    <>
      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
        Option 1
      </div>
      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
        Option 2
      </div>
      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
        Option 3
      </div>
    </>
  );
};

export default Filter;
