import React, { useState, useEffect } from 'react';
import Cta from '../../design-system/cta';

interface AreaFilterProps {
  minArea: number;
  maxArea: number;
  onApply: (min: number, max: number) => void;
  onClose: () => void;
}

const AreaFilter: React.FC<AreaFilterProps> = ({ onApply, onClose }) => {
  const [min, setMin] = useState<string>('');
  const [max, setMax] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const areaSuggestions = [50000, 100000, 150000, 200000, 300000];

  useEffect(() => {
    if (min && max && Number(max) < Number(min)) {
      setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები.');
    } else {
      setError(null);
    }
  }, [min, max]);

  const handleApplyClick = () => {
    if (!error && min && max) {
      onApply(Number(min), Number(max));
      onClose();
    }
  };

  return (
    <div className="relative shadow-[5px_5px_12px_rgba(2,_21,_38,_0.08)] rounded-[10px] bg-white border-gainsboro border-[1px] border-solid box-border w-full flex flex-col items-start justify-start p-6 gap-8 text-left text-sm text-gray-100 font-firago">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="text-[16px] font-bold font-firago text-gray text-left">ფართობის მიხედვით</div>
        <div className="w-[325px] flex flex-row items-center justify-start gap-[15px]">
          <div className="relative flex-1">
            <input
              type="text"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="flex-1 w-[155px] rounded-md border-lightslategray border-[1px] border-solid box-border h-[42px] p-[12.5px] pl-[10px] pr-4"
              placeholder="დან"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">მ²</span>
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="flex-1 w-[155px] rounded-md border-lightslategray border-[1px] border-solid box-border h-[42px] p-[12.5px] pl-[10px] pr-4"
              placeholder="მდე"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">მ²</span>
          </div>
        </div>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
          <div className="flex flex-row items-start justify-start gap-[24px]">
            <div className="flex w-[155px] flex-col items-start gap-4">
              <div className="text-[14px] font-medium font-firago text-gray text-left">მინ. ფართობი</div>
              <div className="flex flex-col gap-2 text-darkslategray">
                {areaSuggestions.map((suggestion) => (
                  <div key={suggestion} onClick={() => setMin(suggestion.toString())} className="cursor-pointer">
                    {suggestion.toLocaleString()} მ²
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-[155px]  flex-col items-start gap-4">
              <div className="text-[14px] font-medium font-firago text-gray text-left">მაქს. ფართობი</div>
              <div className="flex flex-col gap-2 text-darkslategray">
                {areaSuggestions.map((suggestion) => (
                  <div key={suggestion} onClick={() => setMax(suggestion.toString())} className="cursor-pointer">
                    {suggestion.toLocaleString()} მ²
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-end justify-center text-center text-sm text-white">
        <Cta label="არჩევა" size="s" onClick={handleApplyClick} />
      </div>
    </div>
  );
};

export default AreaFilter;
