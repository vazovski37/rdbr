import React from 'react';
import Card from '../../design-system/card';
import { useFetchRealEstates } from '../../hooks/useFetchRealEstates';
import { useBedroomQuantity } from '../../hooks/useBedroomQuantity'; // Import the custom hook

interface RealEstateListProps {
  appliedRegions: string[]; // Regions to filter real estates by
  appliedMinArea?: number; // Minimum area for filtering
  appliedMaxArea?: number; // Maximum area for filtering
  appliedMinPrice?: number; // Minimum price for filtering
  appliedMaxPrice?: number; // Maximum price for filtering
  appliedBedrooms?: number; // Number of bedrooms for filtering
}

const RealEstateList = ({
  appliedRegions,
  appliedMinArea,
  appliedMaxArea,
  appliedMinPrice,
  appliedMaxPrice,
  appliedBedrooms,
}: RealEstateListProps) => {
  const { realEstates, loading, error } = useFetchRealEstates();
  
  const { bedroomCounts } = useBedroomQuantity(realEstates);

  if (loading) {
    return <div>Loading real estates...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const filteredEstates = realEstates.filter((estate) => {
    const regionMatch =
      appliedRegions.length > 0 ? appliedRegions.includes(estate.city.region.id.toString()) : true;
    const areaMatch =
      (appliedMinArea ? estate.area >= appliedMinArea : true) &&
      (appliedMaxArea ? estate.area <= appliedMaxArea : true);
    const priceMatch =
      (appliedMinPrice ? estate.price >= appliedMinPrice : true) &&
      (appliedMaxPrice ? estate.price <= appliedMaxPrice : true);
    const bedroomMatch = appliedBedrooms ? estate.bedrooms === appliedBedrooms : true;

    return regionMatch && areaMatch && priceMatch && bedroomMatch;
  });

  return (
    <div>
      {filteredEstates.length > 0 ? (
        <div className="flex flex-wrap gap-[20px] justify-start">
          {filteredEstates.map((estate) => (
            <Card
              key={estate.id}
              id={estate.id}
              imageSrc={estate.image}
              price={`${estate.price.toLocaleString()} ₾`}
              location={`${estate.city.name}, ${estate.city.region.name}`}
              bedrooms={estate.bedrooms}
              area={`${estate.area} მ²`}
              postalCode={estate.zip_code}
              status={estate.is_rental ? 'დაქირავება' : 'იყიდება'}
            />
          ))}
        </div>
      ) : (
        <div className='text-[20px] font-firago text-gray text-center inline-block'>აღნიშნული მონაცემებით განცხადება არ იძებნება</div>
      )}
    </div>
  );
};

export default RealEstateList;
