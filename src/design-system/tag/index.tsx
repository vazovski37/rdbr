import React from 'react';

interface TagProps {
  label: string;
  className?: string; 
}

const Tag = ({ label, className = '' }: TagProps) => {
  return (
    <div
      className={`w-[90px] h-[26px] cursor-pointer rounded-[15px] bg-gray flex flex-row items-center justify-center box-border text-center text-[12px] text-white font-firago ${className}`}
    >
      <div className="relative tracking-[0.04em] font-firago font-medium
      text-[12px] text-white text-center
      ">{label}</div>
    </div>
  );
};

export default Tag;
