import { useState } from 'react';

// Hook for Region Filter
export const useRegionFilter = (onApplyRegionFilter: (regions: string[]) => void) => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);

  const handleApplyRegionFilter = () => {
    onApplyRegionFilter(selectedRegions);
    const filter = selectedRegions.length > 0 ? selectedRegions.join(', ') : null;
    setRegionFilter(filter);
  };

  const handleSelectRegion = (region: string) => {
    setSelectedRegions((prev) => [...prev, region]);
  };

  const handleDeselectRegion = (region: string) => {
    setSelectedRegions((prev) => prev.filter((r) => r !== region));
  };

  const handleClearRegionFilter = () => {
    setSelectedRegions([]);
    onApplyRegionFilter([]);
    setRegionFilter(null);
  };

  return {
    selectedRegions,
    regionFilter,
    handleApplyRegionFilter,
    handleSelectRegion,
    handleDeselectRegion,
    handleClearRegionFilter,
  };
};

// Hook for Area Filter
export const useAreaFilter = (onApplyAreaFilter: (min: number, max: number) => void) => {
  const [minArea, setMinArea] = useState<number | undefined>(undefined);
  const [maxArea, setMaxArea] = useState<number | undefined>(undefined);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);

  const handleApplyAreaFilter = (min: number, max: number) => {
    onApplyAreaFilter(min, max);
    setMinArea(min);
    setMaxArea(max);
    const filter = min !== undefined && max !== undefined ? `Area: ${min} - ${max} m²` : null;
    setAreaFilter(filter);
  };

  const handleClearAreaFilter = () => {
    setMinArea(undefined);
    setMaxArea(undefined);
    onApplyAreaFilter(0, 0);
    setAreaFilter(null);
  };

  return {
    minArea,
    maxArea,
    areaFilter,
    handleApplyAreaFilter,
    handleClearAreaFilter,
  };
};

// Hook for Price Filter
export const usePriceFilter = (onApplyPriceFilter: (min: number, max: number) => void) => {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const handleApplyPriceFilter = (min: number, max: number) => {
    onApplyPriceFilter(min, max);
    setMinPrice(min);
    setMaxPrice(max);
    const filter = min !== undefined && max !== undefined ? `Price: ₾${min} - ₾${max}` : null;
    setPriceFilter(filter);
  };

  const handleClearPriceFilter = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onApplyPriceFilter(0, 0);
    setPriceFilter(null);
  };

  return {
    minPrice,
    maxPrice,
    priceFilter,
    handleApplyPriceFilter,
    handleClearPriceFilter,
  };
};

// Hook for Bedroom Filter
export const useBedroomFilter = (onApplyBedroomFilter: (bedrooms: number) => void) => {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | undefined>(undefined);
  const [bedroomFilter, setBedroomFilter] = useState<string | null>(null);

  const handleApplyBedroomFilter = (bedrooms: number) => {
    onApplyBedroomFilter(bedrooms);
    setSelectedBedrooms(bedrooms);
    const filter = bedrooms ? `${bedrooms} Bedrooms` : null;
    setBedroomFilter(filter);
  };

  const handleClearBedroomFilter = () => {
    setSelectedBedrooms(undefined);
    onApplyBedroomFilter(0);
    setBedroomFilter(null);
  };

  return {
    selectedBedrooms,
    bedroomFilter,
    handleApplyBedroomFilter,
    handleClearBedroomFilter,
  };
};
