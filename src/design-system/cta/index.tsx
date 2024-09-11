import React from 'react';

interface CTAProps {
  label: string; // Text to display inside the CTA
  size?: 's' | 'm' | 'l'; // Size of the CTA: small, medium, large
  type?: 'primary' | 'secondary' | 'grey'; // Type of the CTA: primary or secondary
  className?: string; // Optional additional className for styling
  iconSrc?: string; // Optional icon source for the 'l' size
}

const Cta: React.FC<CTAProps> = ({
  label,
  size = 'm',
  type = '',
  className = '',
  iconSrc,
}) => {
  // Function to determine base styles based on size
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

  // Function to determine styles based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'primary':
        return 'bg-orangered text-white hover:bg-orangeredHover';
      case 'secondary':
        return 'border-orangered border-[1px] border-solid text-orangered hover:bg-orangered hover:text-white hover:border-none';
      case 'grey':
        return 'rounded-lg bg-white border-lightslategray border-[1px] border-solid box-border text-[14px] font-medium font-firago text-lightslategray text-center hover:bg-lightslategray hover:text-white';
      default:
        return '';
    }
  };

  return (
    <div
      className={`cursor-pointer relative rounded-lg flex  flex-row items-center justify-center box-border font-firago ${getSizeStyles()} ${getTypeStyles()} ${className}`}
    >
      {size === 'l' && (
        // <img className="w-[22px] h-[22px] mr-2" alt="" src={iconSrc} />
        <span className="material-symbols-outlined w-[22px] h-[22px] mr-2">add</span>

      )}
      <div className="relative w-max font-medium">{label}</div>
    </div>
  );
};

export default Cta;
