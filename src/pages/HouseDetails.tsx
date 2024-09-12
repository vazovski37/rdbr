import React from 'react';
import { useParams } from 'react-router-dom';

const HouseDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the house ID from the route parameter

  return (
    <div>
      <h1>House Details</h1>
      <p>Displaying details for house ID: {id}</p>
      {/* Fetch and display data for the specific house here */}
    </div>
  );
};

export default HouseDetails;
