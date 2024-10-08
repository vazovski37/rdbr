import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import LocationIcon from '../../assets/icons/LocationIcon';
import BedroomIcon from '../../assets/icons/BedroomIcon';
import AreaIcon from '../../assets/icons/AreaIcon';
import PostalCodeIcon from '../../assets/icons/PostalCodeIcon';
import Tag from '../tag';

// Define the props interface for the Card component
export interface CardProps {
  id: number; // Add ID prop to navigate to the specific route
  imageSrc: string; // Image source for the card
  price: string; // Price to display formatted with currency
  location: string; // Location text
  bedrooms: number; // Number of bedrooms
  area: string; // Area text (e.g., "55 მ²")
  postalCode: string; // Postal code text
  status: string; // Status label text (e.g., "იყიდება" or "დაქირავება")
}

const Card = ({
  id,
  imageSrc,
  price,
  location,
  bedrooms,
  area,
  postalCode,
  status,
}: CardProps) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle card click
  const handleCardClick = () => {
    navigate(`/house/${id}`); // Navigate to the house details page
  };

  return (
    <div
      onClick={handleCardClick} // Add onClick event handler
      className="w-[382.4px] h-[455px] cursor-pointer relative flex flex-col text-left text-[28px] text-gray-100 font-firago bg-white border border-solid border-lightslategray rounded-lg overflow-hidden hover:shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)]"
    >
      {/* Image Section with Aspect Ratio */}
      <div className="w-full aspect-[382.4/307]">
        <img
          className="w-full h-[307px] object-cover rounded-t-lg"
          alt="Property Image"
          src={imageSrc}
        />
      </div>

      {/* Details Section */}
      <div className="bg-white border border-gainsboro p-5 flex flex-col gap-4">
        {/* Price and Location */}
        <div className="flex flex-col items-start gap-1">
          <b className="text-xl">{price}</b>
          <div className="flex items-center gap-1 text-base text-gray-500">
            <LocationIcon />
            <div className="text-[#021526B2]">{location}</div>
          </div>
        </div>

        {/* Additional Details (Bedrooms, Area, Postal Code) */}
        <div className="flex items-center gap-8 text-base text-gray-500">
          <div className="flex items-center gap-2">
            <BedroomIcon />
            <div className="text-[#021526B2]">{bedrooms}</div>
          </div>
          <div className="flex items-center gap-2">
            <AreaIcon />
            <div className="text-[#021526B2]">{area}</div>
          </div>
          <div className="flex items-center gap-2">
            <PostalCodeIcon />
            <div className="text-[#021526B2]">{postalCode}</div>
          </div>
        </div>
      </div>

      {/* Status Label */}
      <Tag label={status} className="absolute top-[23px] left-[23px] z-2" />
    </div>
  );
};

export default Card;
