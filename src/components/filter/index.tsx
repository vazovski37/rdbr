import React, { useState } from 'react';
import Dropdown from '../../design-system/filter-item';
import RegionFilter from './RegionFilter';
import AreaFilter from './AreaFilter';
import PriceFilter from './PriceFilter';
import BedroomFilter from './BedroomFilter';
import FilterBadge from '../../design-system/filter-badge';
import { useRegionFilter, useAreaFilter, usePriceFilter, useBedroomFilter } from '../../hooks/useFilters';

interface FilterProps {
  onApplyRegionFilter: (regions: string[]) => void;
  onApplyAreaFilter: (min: number, max: number) => void;
  onApplyPriceFilter: (min: number, max: number) => void;
  onApplyBedroomFilter: (bedrooms: number) => void;
}

const Filter: React.FC<FilterProps> = ({
  onApplyRegionFilter,
  onApplyAreaFilter,
  onApplyPriceFilter,
  onApplyBedroomFilter,
}) => {
  // Centralized state to manage which filter dropdown is open
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const {
    selectedRegions,
    regionFilter,
    handleApplyRegionFilter,
    handleSelectRegion,
    handleDeselectRegion,
    handleClearRegionFilter,
  } = useRegionFilter(onApplyRegionFilter);

  const {
    minArea,
    maxArea,
    areaFilter,
    handleApplyAreaFilter,
    handleClearAreaFilter,
  } = useAreaFilter(onApplyAreaFilter);

  const {
    minPrice,
    maxPrice,
    priceFilter,
    handleApplyPriceFilter,
    handleClearPriceFilter,
  } = usePriceFilter(onApplyPriceFilter);

  const {
    selectedBedrooms,
    bedroomFilter,
    handleApplyBedroomFilter,
    handleClearBedroomFilter,
  } = useBedroomFilter(onApplyBedroomFilter);

  const toggleDropdown = (filterName: string) => {
    if (openFilter === filterName) {
      setOpenFilter(null);
    } else {
      setOpenFilter(filterName);
    }
  };

  return (
    <div>
      <div className="relative rounded-[10px] bg-white border-[#dbdbdb] border-[1px] border-solid box-border w-max flex flex-row items-center justify-start p-1.5 gap-6 text-center text-base text-gray font-firago">
        <Dropdown
          label="რეგიონი"
          isOpen={openFilter === 'region'}
          onClick={() => toggleDropdown('region')}
        >
          <RegionFilter
            selectedRegions={selectedRegions}
            onSelectRegion={handleSelectRegion}
            onDeselectRegion={handleDeselectRegion}
            onApply={handleApplyRegionFilter}
            onClose={() => setOpenFilter(null)}
          />
        </Dropdown>

        <Dropdown
          label="ფართობი"
          isOpen={openFilter === 'area'}
          onClick={() => toggleDropdown('area')}
        >
          <AreaFilter
            minArea={minArea || 0}
            maxArea={maxArea || 500}
            onApply={handleApplyAreaFilter}
            onClose={() => setOpenFilter(null)}
          />
        </Dropdown>


        <Dropdown
          label="ფასი"
          isOpen={openFilter === 'price'}
          onClick={() => toggleDropdown('price')}
        >
          <PriceFilter
            minPrice={minPrice || 0}
            maxPrice={maxPrice || 1000000}
            onApply={handleApplyPriceFilter}
            onClose={() => setOpenFilter(null)}
          />
        </Dropdown>

        <Dropdown
          label="საძინებლების რაოდენობა"
          isOpen={openFilter === 'bedroom'}
          onClick={() => toggleDropdown('bedroom')}
        >
          <BedroomFilter
            selectedBedrooms={selectedBedrooms || 1}
            onApply={handleApplyBedroomFilter}
            onClose={() => setOpenFilter(null)}
          />
        </Dropdown>
      </div>
      <div className="flex mt-[16px] h-[29px] mb-[32px] gap-2">
        {regionFilter && <FilterBadge label={regionFilter} onClick={handleClearRegionFilter} />}
        {areaFilter && <FilterBadge label={areaFilter} onClick={handleClearAreaFilter} />}
        {priceFilter && <FilterBadge label={priceFilter} onClick={handleClearPriceFilter} />}
        {bedroomFilter && <FilterBadge label={bedroomFilter} onClick={handleClearBedroomFilter} />}
      </div>
    </div>
  );
};

export default Filter;
