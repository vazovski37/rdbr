import React, { useEffect } from 'react';
import useFetchRegions from '../../hooks/useFetchRegions';
import Checkbox from '../../design-system/checkbox';
import Cta from '../../design-system/cta';

interface RegionFilterProps {
  pendingRegions: string[];
  onSelectRegion: (region: string) => void;
  onDeselectRegion: (region: string) => void;
  onApply: () => void;
  onClose: () => void;
  setRegionNames: (regions: { id: number; name: string }[]) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({
  pendingRegions,
  onSelectRegion,
  onDeselectRegion,
  onApply,
  onClose,
  setRegionNames,
}) => {
  const { regions, loading, error } = useFetchRegions();

  useEffect(() => {
    if (regions.length > 0) {
      setRegionNames(regions);
    }
  }, [regions, setRegionNames]); // Ensure this does not cause an infinite loop

  const handleRegionToggle = (regionId: string) => {
    if (pendingRegions.includes(regionId)) {
      onDeselectRegion(regionId);
    } else {
      onSelectRegion(regionId);
    }
  };

  const handleApplyClick = () => {
    onApply(); // Apply the selected filters only when this button is clicked
    onClose();
  };

  if (loading) return <div>Loading regions...</div>;
  if (error) return <div>Error loading regions: {error}</div>;

  return (
    <div className="w-[679px] relative shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)] rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border flex flex-col items-start justify-start p-6 gap-8 text-left text-[16px] text-gray font-firago">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="text-[16px] font-medium font-firago text-gray text-left inline-block">რეგიონის მიხედვით</div>
        <div className="w-[679px] grid grid-cols-3 gap-x-[50px] gap-y-4 text-sm">
          {regions.map((region) => (
            <div key={region.id} className="flex flex-row items-center justify-start gap-2">
              <Checkbox
                checked={pendingRegions.includes(region.id.toString())}
                onChange={() => handleRegionToggle(region.id.toString())}
              />
              <div className="text-[14px] font-firago text-gray text-left inline-block">{region.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-end justify-center text-center text-sm text-white">
        <Cta label="არჩევა" size="s" onClick={handleApplyClick} />
      </div>
    </div>
  );
};

export default RegionFilter;
