import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cta from '../../design-system/cta';
import Filter from '../../components/filter';

interface HomeHeaderProps {
  onAddAgent: () => void;
  onApplyRegionFilter: (regions: string[]) => void;
  onApplyAreaFilter: (min: number, max: number) => void;
  onApplyPriceFilter: (min: number, max: number) => void;
  onApplyBedroomFilter: (bedrooms: number) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  onAddAgent,
  onApplyRegionFilter,
  onApplyAreaFilter,
  onApplyPriceFilter,
  onApplyBedroomFilter,
}) => {
  const navigate = useNavigate();

  const handleAddHouseRedirect = () => {
    navigate('/add-house');
  };

  return (
    <div className="flex gap-4 items-start justify-between w-full bg-white border-b border-gray-200">
      <Filter
        onApplyRegionFilter={onApplyRegionFilter}
        onApplyAreaFilter={onApplyAreaFilter}
        onApplyPriceFilter={onApplyPriceFilter}
        onApplyBedroomFilter={onApplyBedroomFilter}
      />

      <div className="flex gap-4 ">
        <Cta
          label="ლისტნიგს დამატება"
          size="l"
          type="primary"
          onClick={handleAddHouseRedirect}
        />
        <Cta
          label="აგენტის დამატება"
          size="l"
          type="secondary"
          onClick={onAddAgent}
        />
      </div>
    </div>
  );
};

export default HomeHeader;
