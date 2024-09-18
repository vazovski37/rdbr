import React, { useState } from 'react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onApply: (min: number, max: number) => void; // Apply the selected price filter
  onClose: () => void; // Close the dropdown
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, onApply, onClose }) => {
  const [min, setMin] = useState<number>(minPrice);
  const [max, setMax] = useState<number>(maxPrice);

  const handleApplyClick = () => {
    onApply(min, max); // Apply filter with selected price range
    onClose(); // Close the dropdown
  };

  return (
    <div className="relative shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)] rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border w-full flex flex-col items-start justify-start p-6 gap-8 text-left text-sm text-gray-100 font-firago">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="self-stretch relative text-[16px] font-medium">ფასის მიხედვით</div>
        <div className="w-[325px] flex flex-row items-center justify-start gap-[15px] text-gray-200">
          {/* Min Price Input */}
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="flex-1 rounded-md border-lightslategray border-[1px] border-solid box-border h-[42px] p-2.5"
            placeholder="დან"
          />
          {/* Max Price Input */}
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="flex-1 rounded-md border-lightslategray border-[1px] border-solid box-border h-[42px] p-2.5"
            placeholder="მდე"
          />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-end justify-center text-center text-sm text-white">
        <button onClick={handleApplyClick} className="rounded-lg bg-orangered flex flex-row items-center justify-center py-2 px-3.5">
          <div className="relative font-medium">არჩევა</div>
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
