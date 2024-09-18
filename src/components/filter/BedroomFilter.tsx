import React, { useEffect, useState } from 'react';

interface BedroomFilterProps {
  selectedBedrooms: number;
  onApply: (bedrooms: number) => void; // Apply the selected bedroom filter
  onClose: () => void; // Close the dropdown
}

const BedroomFilter: React.FC<BedroomFilterProps> = ({ selectedBedrooms, onApply, onClose }) => {
  const [bedrooms, setBedrooms] = useState<number>(selectedBedrooms);
  const [bedroomCounts, setBedroomCounts] = useState<number[]>([]); // State to store bedroom counts

  useEffect(() => {
    // Fetch bedroom counts from localStorage
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
    onApply(bedrooms); // Apply filter with selected number of bedrooms
    onClose(); // Close the dropdown
  };

  return (
    <div className="relative shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)] rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border w-full flex flex-col items-start justify-start p-6 gap-8 text-left text-[16px] text-gray-100 font-firago">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="relative font-medium">საძინებლების რაოდენობა</div>
        <div className="flex flex-wrap gap-2">
          {/* Generate bedroom buttons from stored counts */}
          {bedroomCounts.map((num) => (
            <button
              key={num}
              onClick={() => setBedrooms(num)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                bedrooms === num ? 'bg-orangered text-white' : 'bg-white text-gray-200 border-gray-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="w-[234px] flex flex-col items-end justify-center text-center text-sm text-white">
        <button onClick={handleApplyClick} className="rounded-lg bg-orangered flex flex-row items-center justify-center py-2 px-3.5">
          <div className="relative font-medium">არჩევა</div>
        </button>
      </div>
    </div>
  );
};

export default BedroomFilter;
