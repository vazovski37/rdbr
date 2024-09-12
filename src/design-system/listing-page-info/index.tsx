import React from 'react';
import BedroomIcon from '../../assets/icons/BedroomIcon';
import AreaIcon from '../../assets/icons/AreaIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import PostalCodeIcon from '../../assets/icons/PostalCodeIcon';

interface InfoItemProps {
  icon: React.ReactNode; // Updated to accept a ReactNode for the icon
  label: string;
  value: string | number;
}

interface ListingPageInfoProps {
  price: string;
  location: string;
  area: string;
  areaUnit: string;
  bedrooms: number;
  postalCode: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex flex-row items-center justify-start gap-1">
    <div className="w-[22px] h-[22px] flex justify-center mr-2">{icon}</div>
    <div className="text-[24px]">{label}</div>
    <div className="text-[24px]">{value}</div>
  </div>
);

const ListingPageInfo = ({ price, location, area, areaUnit, bedrooms, postalCode }: ListingPageInfoProps) => {
  return (
    <div className="relative w-full flex flex-col items-start justify-start gap-6 text-left text-[48px] text-gray font-firago">
      <b className="self-stretch text-[#021526]">{price}</b>
      <div className="flex flex-col items-start justify-center gap-4 text-5xl text-lightslategray">
        {/* Location */}
        <InfoItem icon={<LocationIcon />} label={location} value="" />

        {/* Area */}
        <InfoItem icon={<AreaIcon />} label="ფართი" value={`${area} ${areaUnit}`} />

        {/* Bedrooms */}
        <InfoItem icon={<BedroomIcon />} label="საძინებელი" value={bedrooms} />

        {/* Postal Code */}
        <InfoItem icon={<PostalCodeIcon />} label="საფოსტო ინდექსი" value={postalCode} />
      </div>
    </div>
  );
};

export default ListingPageInfo;
