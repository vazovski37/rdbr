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

const Filter = ({
  onApplyRegionFilter,
  onApplyAreaFilter,
  onApplyPriceFilter,
  onApplyBedroomFilter,
}: FilterProps) => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const {
    appliedRegions,
    pendingRegions,
    regionFilter,
    handleApplyRegionFilter,
    handleSelectRegion,
    handleDeselectRegion,
    handleDeselectAppliedRegion,
    handleClearRegionFilter,
    setRegionNames,
    syncPendingWithApplied,
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

  // Function to clear all filters
  const handleClearAllFilters = () => {
    handleClearRegionFilter();
    handleClearAreaFilter();
    handleClearPriceFilter();
    handleClearBedroomFilter();
  };

  const toggleDropdown = (filterName: string) => {
    if (openFilter === filterName) {
      setOpenFilter(null);
    } else {
      syncPendingWithApplied();
      setOpenFilter(filterName);
    }
  };

  // Check if any filters are applied
  const isAnyFilterApplied = !!(
    regionFilter.length ||
    areaFilter ||
    priceFilter ||
    bedroomFilter
  );

  return (
    <div>
      <div className="relative rounded-[10px] bg-white border-[#dbdbdb] border-[1px] border-solid box-border w-max flex flex-row items-center justify-start p-1.5 gap-6 text-center text-base text-gray font-firago">
        <Dropdown
          label="რეგიონი"
          isOpen={openFilter === 'region'}
          onClick={() => toggleDropdown('region')}
        >
          <RegionFilter
            pendingRegions={pendingRegions}
            onSelectRegion={handleSelectRegion}
            onDeselectRegion={handleDeselectRegion}
            onApply={handleApplyRegionFilter}
            onClose={() => setOpenFilter(null)}
            setRegionNames={setRegionNames}
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

      {/* Filter Badges and Clear All Button */}
      <div className="flex mt-[16px] h-[29px] mb-[32px] gap-2 items-center">
        {regionFilter.map((regionName, index) => (
          <FilterBadge
            key={index}
            label={regionName}
            onClick={() => handleDeselectAppliedRegion(regionName)}
          />
        ))}
        {areaFilter && <FilterBadge label={areaFilter} onClick={handleClearAreaFilter} />}
        {priceFilter && <FilterBadge label={priceFilter} onClick={handleClearPriceFilter} />}
        {bedroomFilter && <FilterBadge label={bedroomFilter} onClick={handleClearBedroomFilter} />}

        {/* Display Clear All Button if any filter is applied */}
        {isAnyFilterApplied && (
          <div
            className="relative text-[14px] font-medium font-firago text-gray text-center cursor-pointer"
            onClick={handleClearAllFilters}
          >
            გასუფთავება
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
