import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchRealEstateById from '../hooks/useFetchRealEstateById'; 
import { useFetchRealEstates } from '../hooks/useFetchRealEstates'; 
import { useRegionFilter } from '../hooks/useFilters'; 
import HouseDetailContent from '../components/house-detail-content/index'; 
import Carousel from '../design-system/carousel'; 

const HouseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetchRealEstateById(Number(id));
  const { realEstates: allRealEstates, loading: allLoading, error: allError } = useFetchRealEstates(); 

  const { handleSelectRegion } = useRegionFilter(() => {});

  useEffect(() => {
    if (data?.city?.name) {
      handleSelectRegion(data.city.name);  // Apply the region filter once the data is fetched
    }
  }, [data?.city?.name]); // Only add the city name as a dependency to avoid unnecessary re-renders

  if (loading || allLoading) return <p>Loading...</p>;
  if (error || allError) return <p>Error: {error || allError}</p>;

  const filteredRealEstates = allRealEstates?.filter(
    (realEstate) => realEstate.city.name === data?.city?.name && realEstate.id !== data?.id
  ).map(realEstate => ({
    ...realEstate,
    is_rental: !!realEstate.is_rental, // Convert number to boolean
  }));

  return (
    <div className="flex flex-col items-center justify-start w-full">
      {data ? (
        <HouseDetailContent
          id={data.id}
          createdAt={data.created_at}
          imageSrc={data.image}
          price={data.price}
          location={`${data.city.name}, ${data.address}`}
          area={data.area}
          areaUnit="მ²"
          bedrooms={data.bedrooms}
          postalCode={data.zip_code}
          description={data.description}
          status={data.is_rental ? 'დაქირავება' : 'იყიდება'}
          agentName={`${data.agent.name} ${data.agent.surname}`}
          agentRole="აგენტი"
          agentImage={data.agent.avatar}
          agentEmail={data.agent.email}
          agentPhone={data.agent.phone}
        />
      ) : (
        <p>No data found.</p>
      )}

      {filteredRealEstates && filteredRealEstates.length > 0 && (
        <div className="w-full mt-10">
          <Carousel items={filteredRealEstates} />
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
