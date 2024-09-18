import React, { useState } from 'react';
import ListingPageInfo from '../../design-system/listing-page-info'; 
import AgentDetails from '../../design-system/agent-details';
import Tag from '../../design-system/tag';
import Cta from '../../design-system/cta';
import DeleteModal from '../../components/delete-modal/index';
import { useDeleteRealEstate } from '../../hooks/useDeleteRealEstate';

interface HouseDetailContentProps {
  id: number;
  createdAt: string;
  imageSrc: string;
  price: number;
  location: string;
  area: number;
  areaUnit: string;
  bedrooms: number;
  postalCode: string;
  description: string;
  status: string;
  agentName: string;
  agentRole: string;
  agentImage: string;
  agentEmail: string;
  agentPhone: string;
}

const HouseDetailContent: React.FC<HouseDetailContentProps> = ({
  id,
  createdAt,
  imageSrc,
  price,
  location,
  area,
  areaUnit,
  bedrooms,
  postalCode,
  description,
  status,
  agentName,
  agentRole,
  agentImage,
  agentEmail,
  agentPhone,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteRealEstate, isDeleting } = useDeleteRealEstate(id);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    deleteRealEstate(); 
    handleCloseModal(); 
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full relative flex flex-row items-start justify-start gap-[68px] font-firago">
      <div className="flex flex-col justify-start items-end gap-[25px]">
        <img
          className="w-[839px] h-[670px] rounded-t-sm object-cover"
          alt="Property"
          src={imageSrc}
        />
        <div className="text-[#808a93] text-[16px]">
          გამოქვეყნების თარიღი {formatDate(createdAt)}
        </div>
      </div>

      <div className="w-[503px] flex flex-col items-start justify-start pt-[30px] gap-10">
        <div className="flex flex-col items-start justify-start gap-6">
          <ListingPageInfo
            price={`${price} ₾`}
            location={location}
            area={area.toFixed(2)}
            areaUnit={areaUnit}
            bedrooms={bedrooms}
            postalCode={postalCode}
          />
        </div>

        <div className="text-base text-lightslategray">
          <p className="leading-[26px]">{description}</p>
        </div>

        <AgentDetails
          name={agentName}
          role={agentRole}
          imageSrc={agentImage}
          email={agentEmail}
          phone={agentPhone}
        />

        <Cta
          label="ლისტინგის წაშლა"
          type="grey"
          size="m"
          onClick={handleOpenModal}
        />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <DeleteModal 
              onConfirm={handleConfirmDelete} 
              onCancel={handleCloseModal} 
            />
          </div>
        )}
      </div>

      <Tag label={status} className="absolute top-[41px] left-[41px] z-2" />
    </div>
  );
};

export default HouseDetailContent;
