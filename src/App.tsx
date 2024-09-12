import React, { useState } from 'react';
import './App.css';
import FormField from './design-system/form-fields'; // Import your FormField component
import ListingPageInfo from './design-system/listing-page-info';

function App() {

  const propertyData = {
    id: 1,
    address: "შარტავას 2ა",
    zip_code: "0101",
    price: 100000,
    area: 100.5,
    bedrooms: 3,
    is_rental: 0,
    city_id: 1,
    description: "სახლი ლიანდაგთან",
    created_at: "2024-08-07T10:46:53.000000Z",
    city: {
      id: 1,
      name: "სოხუმი",
      region_id: 1,
      region: {
        id: 1,
        name: "აფხაზეთი",
      },
    },
    agent_id: 1,
    agent: {
      id: 1,
      name: "gela",
      surname: "gocha",
      email: "gela@redberry.ge",
      phone: "555555555",
      avatar:
        "https://api.real-estate-manager.redberryinternship.com/images/hmnVAO6LEytzoxFz8vRqBCry6ba1wvHvo2YxPXJW.jpg",
    },
  };

  const [textValue, setTextValue] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined); // State for uploaded image initialized with undefined

  // Validation function to check if the input is valid
  const isValid = (value: string): boolean => {
    return value.length >= 2; // Example: Input must be at least 2 characters long
  };

  // Handle image upload
  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file); // Create a URL for the uploaded image
    setUploadedImage(imageUrl); // Set the uploaded image URL
  };

  // Handle image delete
  const handleImageDelete = () => {
    setUploadedImage(undefined); // Reset the uploaded image state
  };

  const [isRental, setIsRental] = useState<boolean>(true); // State to manage the selected radio button

  // Handle radio button change
  const handleRadioChange = (value: boolean) => {
    setIsRental(value); // Update the state based on the selected radio option
  };

  return (
    <div className="App ml-2">
      {/* Text Input Field */}
      <FormField
        label="Text Input"
        type="text"
        placeholder="Enter text"
        value={textValue} // Controlled value
        onChange={(e) => setTextValue(e.target.value)} // onChange handler
        isValid={isValid(textValue)} // Pass validation result
      />

      {/* Long Text Input Field */}
      <FormField
        label="Long Text Input"
        type="longtext"
        placeholder="Enter long text"
        value={textValue} // Controlled value
        onChange={(e) => setTextValue(e.target.value)} // onChange handler
        isValid={isValid(textValue)} // Pass validation result
      />

      {/* Dropdown Field */}
      <FormField
        label="Select Region"
        type="dropdown"
        placeholder="აირჩიე"
        options={['იმერეთი', 'სამეგრელო', 'გურია']}
        onSelect={(selectedOption) => console.log(selectedOption)}
        onAgentAdd={() => console.log('Agent added')}
      />

      {/* Image Upload Field */}
      <FormField
        label="Upload Image"
        type="image" // Set type to 'image'
        imageUrl={uploadedImage} // Pass the uploaded image URL or undefined if no image is uploaded
        onImageUpload={handleImageUpload} // Function to handle image upload
        onImageDelete={handleImageDelete} // Function to handle image deletion
      />

      {/* Display uploaded image preview */}
      {uploadedImage && (
        <div className="mt-4">
          <p>Uploaded Image Preview:</p>
          <img src={uploadedImage} alt="Uploaded Preview" className="w-32 h-32 object-cover rounded-md" />
        </div>
      )}

<FormField
        label="Choose Option"
        type="radio" // Set type to 'radio' for custom radio buttons
        isRental={isRental} // Pass the current state of isRental
        onRadioChange={handleRadioChange} // Function to handle radio button changes
      />


<ListingPageInfo
    price={`${propertyData.price.toLocaleString()} ₾`} // Format the price with a locale string
    location={`${propertyData.city.name}, ${propertyData.address}`} // Combine city name and address
    area={propertyData.area.toString()} // Convert area to string
    areaUnit="მ²" // Static value for area unit
    bedrooms={propertyData.bedrooms} // Number of bedrooms
    postalCode={propertyData.zip_code} // Postal code
  />
    </div>
  );
}

export default App;
