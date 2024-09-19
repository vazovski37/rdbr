import { useState } from 'react';

type Region = {
  id: number;
  name: string;
};

export const useRegionFilter = (
  onApplyRegionFilter: (regions: string[]) => void
) => {
  const [appliedRegions, setAppliedRegions] = useState<string[]>([]);
  const [pendingRegions, setPendingRegions] = useState<string[]>([]);
  const [regionNamesMap, setRegionNamesMap] = useState<Record<string, string>>(
    {}
  );
  const [regionFilter, setRegionFilter] = useState<string[]>([]);

  const setRegionNames = (regions: Region[]) => {
    const newNamesMap: Record<string, string> = {};
    regions.forEach((region) => {
      newNamesMap[region.id.toString()] = region.name;
    });
    
    if (JSON.stringify(newNamesMap) !== JSON.stringify(regionNamesMap)) {
      setRegionNamesMap(newNamesMap);
    }
  };

  const syncPendingWithApplied = () => {
    setPendingRegions(appliedRegions);
  };

  const handleApplyRegionFilter = () => {
    const selectedRegionNames = pendingRegions
      .map((id) => regionNamesMap[id])
      .filter(Boolean);
    setRegionFilter(selectedRegionNames);
    setAppliedRegions(pendingRegions); 
    onApplyRegionFilter(pendingRegions);
  };

  const handleSelectRegion = (regionId: string) => {
    if (!pendingRegions.includes(regionId)) {
      setPendingRegions((prev) => [...prev, regionId]);
    }
  };

  const handleDeselectRegion = (regionId: string) => {
    setPendingRegions((prev) => prev.filter((id) => id !== regionId));
  };

  const handleDeselectAppliedRegion = (regionName: string) => {
    const regionId = Object.keys(regionNamesMap).find(
      (key) => regionNamesMap[key] === regionName
    );
    if (regionId) {
      const updatedRegions = appliedRegions.filter((id) => id !== regionId);
      setAppliedRegions(updatedRegions);
      setRegionFilter((prev) => prev.filter((name) => name !== regionName));
      onApplyRegionFilter(updatedRegions);
    }
  };

  const handleClearRegionFilter = () => {
    setPendingRegions([]);
    setAppliedRegions([]);
    setRegionFilter([]);
    onApplyRegionFilter([]);
  };

  return {
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
