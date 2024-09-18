import React from 'react';

interface CTAProps {
  label: string; 
  size?: 's' | 'm' | 'l'; 
  type?: 'primary' | 'secondary' | 'grey'; 
  className?: string; 
  iconSrc?: string; 
  onClick?: () => void; 
  disabled?: boolean; 
}

const Cta = ({
  label,
  size = 'm',
  type = 'primary',
  className = '',
  iconSrc,
  onClick,
  disabled = false, 
}: CTAProps) => {

  const getSizeStyles = () => {
    switch (size) {
      case 's':
        return 'py-[8px] px-[14px] text-[14px] w-min';
      case 'm':
        return 'w-[150px] h-[37px] text-[14px] ';
      case 'l':
        return 'h-[47px] py-2.5 px-4 text-[16px] gap-0.5 w-min';
      default:
        return '';
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'primary':
        return `bg-orangered text-white hover:bg-orangeredHover ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`;
      case 'secondary':
        return `border-orangered border-[1px] border-solid text-orangered hover:bg-orangered hover:text-white ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`;
      case 'grey':
        return `rounded-lg bg-white border-dimgray border-[1px] border-solid box-border text-[14px] font-medium font-firago text-dimgray text-center hover:bg-dimgray hover:text-white ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`;
      default:
        return '';
    }
  };

  return (
    <div
      className={`cursor-pointer relative rounded-lg flex flex-row items-center justify-center box-border font-firago ${getSizeStyles()} ${getTypeStyles()} ${className}`}
      onClick={!disabled ? onClick : undefined}
    >
      {size === 'l' && (
        <span className="material-symbols-outlined w-[22px] h-[22px] mr-2">add</span>
      )}
      <div className="relative w-max font-medium">{label}</div>
    </div>
  );
};

export default Cta;
