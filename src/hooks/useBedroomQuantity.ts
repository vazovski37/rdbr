import { useState, useEffect } from 'react';

export interface RealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: string;
  city: {
    id: number;
    name: string;
    region: {
      id: number;
      name: string;
    };
  };
}

export const useBedroomQuantity = (realestateList: RealEstate[]) => {
  const [bedroomCounts, setBedroomCounts] = useState<number[]>([]); // State to manage unique bedroom counts

  useEffect(() => {
    if (realestateList.length > 0) {
      const uniqueBedrooms: number[] = []; // Array to store unique bedroom counts

      // Loop through realestateList to check for unique bedroom counts
      for (let i = 0; i < realestateList.length; i++) {
        const bedrooms = realestateList[i].bedrooms;

        // Check if the bedroom count already exists in the uniqueBedrooms array
        if (uniqueBedrooms.indexOf(bedrooms) === -1) {
          uniqueBedrooms.push(bedrooms); // Add it if it's not in the list
        }
      }

      // Simple sort in ascending order
      uniqueBedrooms.sort((a, b) => a - b);

      setBedroomCounts(uniqueBedrooms); // Update state with sorted bedroom counts

      // Store sorted list in localStorage
      localStorage.setItem('bedroomCounts', JSON.stringify(uniqueBedrooms));
    }
  }, [realestateList]);

  return { bedroomCounts };
};
