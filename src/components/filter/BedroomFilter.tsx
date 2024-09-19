import React, { useEffect, useState } from 'react';
import Cta from '../../design-system/cta';

interface BedroomFilterProps {
  selectedBedrooms: number;
  onApply: (bedrooms: number) => void;
  onClose: () => void;
}

const BedroomFilter: React.FC<BedroomFilterProps> = ({ selectedBedrooms, onApply, onClose }) => {
  const [bedrooms, setBedrooms] = useState<number>(selectedBedrooms);
  const [bedroomCounts, setBedroomCounts] = useState<number[]>([]);

  useEffect(() => {
    const bedroomCountsFromStorage = localStorage.getItem('bedroomCounts');

    if (bedroomCountsFromStorage) {
      try {
        const parsedCounts = JSON.parse(bedroomCountsFromStorage);
        setBedroomCounts(parsedCounts);
      } catch (error) {
        console.error('Error parsing bedroom counts from localStorage:', error);
      }
    }
  }, []);

  const handleApplyClick = () => {
    onApply(bedrooms);
    onClose();
  };

  return (
    <div className="relative shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)] rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border w-full flex flex-col items-start justify-start p-6 gap-8 text-left text-[16px] text-gray-100 font-firago">
      <div className="flex flex-col items-start justify-start gap-6">
        <span className="cursor-default text-[16px] font-medium font-firago text-gray text-left inline-block">საძინებლების რაოდენობა</span>
        <div className="flex flex-wrap gap-2">
          {bedroomCounts.map((num) => (
            <button
              key={num}
              onClick={() => setBedrooms(num)}
              className={`rounded-md cursor-pointer border-lightslategray border-[1px] border-solid box-border h-[42px] w-[42px] flex flex-row items-center justify-center p-2.5 ${
                bedrooms === num ? 'bg-orangered text-white' : 'bg-white text-lightslategray border-lightgray'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-end justify-center text-center text-sm text-white">
        <Cta label="არჩევა" size="s" onClick={handleApplyClick} />
      </div>
    </div>
  );
};

export default BedroomFilter;
