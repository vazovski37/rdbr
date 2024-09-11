import React, { useState } from 'react';
import './App.css';
import Tag from './design-system/tag';
import Cta from './design-system/cta';
import Dropdown from './design-system/filter-item';
import Filter from './components/filter';
import FilterBadge from './design-system/filter-badge';
import Card, { CardProps } from './design-system/card';
import TextField from './design-system/fields';

function App() {
  const [textValue, setTextValue] = useState('');

  // Validation function to check if the input is valid
  const isValid = (value: string): boolean => {
    return value.length >= 2; // Example: Input must be at least 2 characters long
  };

  const data = [
    {
      id: 1,
      address: "შარტავას 2ა",
      zip_code: "0101",
      price: 100000,
      area: 100.5,
      bedrooms: 3,
      is_rental: 0,
      image:
        "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
      city_id: 1,
      city: {
        id: 1,
        name: "სოხუმი",
        region_id: 1,
        region: {
          id: 1,
          name: "აფხაზეთი",
        },
      },
    },
  ];

  // Utility function to map API data to CardProps
  const mapDataToCardProps = (data: any): CardProps => {
    return {
      imageSrc: data.image,
      price: `${data.price.toLocaleString()} ₾`,
      location: `${data.city.name}, ${data.address}`,
      bedrooms: data.bedrooms,
      area: `${data.area} მ²`,
      postalCode: data.zip_code,
      status: data.is_rental ? 'დაქირავება' : 'იყიდება',
    };
  };

  return (
    <div className="App ml-2">

      <TextField
        label="egaa"
        type="text"
        placeholder=""
        value={textValue} // Controlled value
        onChange={(e) => setTextValue(e.target.value)} // onChange handler
        isValid={isValid(textValue)} // Pass validation result
      />
      <TextField
        label="egaa"
        type="longtext"
        placeholder=""
        value={textValue} // Controlled value
        onChange={(e) => setTextValue(e.target.value)} // onChange handler
        isValid={isValid(textValue)} // Pass validation result
      />
      <TextField type='dropdown' />
    </div>
  );
}

export default App;
