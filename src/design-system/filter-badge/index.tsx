import React from 'react';

interface FilterBadgeProps {
  label: string;
  onClick?: () => void; 
}

const FilterBadge = ({ label, onClick }: FilterBadgeProps) => {
  return (
    <div className="relative cursor-pointer w-max rounded-[43px] bg-white border-gainsboro border-[1px] border-solid box-border flex flex-row items-center justify-start py-1.5 px-2.5 gap-1 text-center  text-gray font-firago" onClick={onClick}>
        <div className="relative text-[#021526CC] text-[14px] mr-[4px]">{label}</div>
        <span className="material-symbols-outlined">close</span>
    </div>
  );
};

export default FilterBadge;
