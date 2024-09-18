import React, { useState } from 'react';
import RealEstateList from '../components/real-estate-list';
import HomeHeader from '../components/home-header';
import useAgentModal from '../hooks/useAgentModal';

const HomePage: React.FC = () => {
  const { openAgentModal, AgentModal } = useAgentModal();

  const [appliedRegions, setAppliedRegions] = useState<string[]>([]);
  const [minArea, setMinArea] = useState<number | undefined>(undefined);
  const [maxArea, setMaxArea] = useState<number | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [bedrooms, setBedrooms] = useState<number | undefined>(undefined);

  const handleApplyRegionFilter = (regions: string[]) => {
    setAppliedRegions(regions);
  };

  const handleApplyAreaFilter = (min: number, max: number) => {
    setMinArea(min);
    setMaxArea(max);
  };

  const handleApplyPriceFilter = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleApplyBedroomFilter = (bedroomCount: number) => {
    setBedrooms(bedroomCount);
  };

  return (
    <div className='mt-20' >
      <div className='px-[160px]' >
        <HomeHeader
          onAddAgent={openAgentModal}
          onApplyRegionFilter={handleApplyRegionFilter}
          onApplyAreaFilter={handleApplyAreaFilter}
          onApplyPriceFilter={handleApplyPriceFilter}
          onApplyBedroomFilter={handleApplyBedroomFilter}
        />
        <RealEstateList
          appliedRegions={appliedRegions}
          appliedMinArea={minArea}
          appliedMaxArea={maxArea}
          appliedMinPrice={minPrice}
          appliedMaxPrice={maxPrice}
          appliedBedrooms={bedrooms}
        />
      </div>
      <AgentModal />
    </div>
  );
};

export default HomePage;
