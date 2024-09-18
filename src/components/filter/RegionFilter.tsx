import React, { useEffect } from 'react';
import useFetchRegions from '../../hooks/useFetchRegions';
import Checkbox from '../../design-system/checkbox'; // Assuming you have a checkbox component in your design system

interface RegionFilterProps {
  selectedRegions: string[]; // Array of selected region IDs
  onSelectRegion: (region: string) => void; // Function to handle region selection
  onDeselectRegion: (region: string) => void; // Function to handle region deselection
  onApply: () => void; // Function to apply filter
  onClose: () => void; // Close the dropdown
}

const RegionFilter: React.FC<RegionFilterProps> = ({
  selectedRegions,
  onSelectRegion,
  onDeselectRegion,
  onApply,
  onClose,
}) => {
  const { regions, loading, error } = useFetchRegions();

  const handleRegionChange = (regionId: string, checked: boolean) => {
    if (checked) {
      onSelectRegion(regionId);
    } else {
      onDeselectRegion(regionId);
    }
  };

  const handleApplyClick = () => {
    onApply(); // Apply the selected regions
    onClose(); // Close the dropdown
  };

  if (loading) return <div>Loading regions...</div>;
  if (error) return <div>Error loading regions: {error}</div>;

  return (
    <div className="w-full relative shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)] rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border flex flex-col items-start justify-start p-6 gap-8 text-left text-[16px] text-gray font-firago">
      <div className="w-[679px] flex flex-col items-start justify-start gap-6">
        <div className="self-stretch relative font-medium">რეგიონის მიხედვით</div>
        <div className="w-[679px] flex flex-row items-end justify-start flex-wrap content-end gap-x-[50px] gap-y-4 text-sm">
          {regions.map((region) => (
            <div key={region.id} className="flex flex-row items-center justify-start gap-2">
              <Checkbox
                checked={selectedRegions.includes(region.id.toString())}
                onChange={(e) => handleRegionChange(region.id.toString(), e.target.checked)}
              />
              <div className="w-[163px] relative inline-block shrink-0">{region.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-end justify-center text-center text-sm text-white">
        <div className="flex flex-row items-start justify-start">
          <button
            className="rounded-lg bg-orangered flex flex-row items-center justify-center py-2 px-3.5"
            onClick={handleApplyClick} // Call the handleApplyClick function
          >
            <div className="relative font-medium">არჩევა</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionFilter;
