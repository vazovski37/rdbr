import React from 'react';

interface DropdownProps {
  label: string;
  children: React.ReactNode; 
  isOpen: boolean; 
  onClick: () => void; 
}

const Dropdown = ({ label, children, isOpen, onClick }: DropdownProps) => {
  return (
    <div className="relative inline-block text-left">
      <div
        onClick={onClick}
        className={`cursor-pointer rounded-md  ${isOpen ? 'bg-[#F3F3F3]' : 'bg-whitesmoke'} w-full flex flex-row items-center justify-start py-2 px-3.5 box-border gap-1 text-center text-[16px] text-gray font-firago`}
      >
        <span className='text-[16px] font-bold font-firago text-[#021526] text-center'>{label}</span>
        
        <span className={`material-symbols-outlined text-[#021526] transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0' }`}>keyboard_arrow_down</span>

      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
