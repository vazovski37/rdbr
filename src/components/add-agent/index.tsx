import React, { useState } from 'react';
import FormField from '../../design-system/form-fields';
import Cta from '../../design-system/cta';
import { addAgent } from '../../services/agentServices';

interface AddAgentProps {
  onCancel: () => void; 
  onAddAgentSuccess: () => void;  
}

const AddAgent = ({ onCancel, onAddAgentSuccess }: AddAgentProps) => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null); 
  const [avatarPreview, setAvatarPreview] = useState<string>(''); 

  const handleAddAgent = async () => {
    if (!avatar) {
      alert('Please upload an avatar');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('avatar', avatar); 

    try {
      await addAgent(formData);
      alert('Agent added successfully!');
      onAddAgentSuccess(); 
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  const handleImageUpload = (file: File) => {
    setAvatar(file); 
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string); 
    };
    reader.readAsDataURL(file); 
  };

  const handleImageDelete = () => {
    setAvatar(null); 
    setAvatarPreview(''); 
  };

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-3xs p-8 max-w-4xl mx-auto">
      <div className="text-[32px] font-medium mb-8">აგენტის დამატება</div>

      <div className="w-[800px] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <FormField
            type="text"
            label="სახელი *"
            placeholder="სახელი"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isValid={name.length >= 2}
            errorMessage="მინიმუმ ორი სიმბოლო"
            successMessage="მინიმუმ ორი სიმბოლო"
          />
          <FormField
            type="text"
            label="გვარი"
            placeholder="გვარი"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            isValid={surname.length >= 2}
            errorMessage="მინიმუმ ორი სიმბოლო"
            successMessage="მინიმუმ ორი სიმბოლო"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <FormField
            type="text"
            label="ელ-ფოსტა*"
            placeholder="ელ-ფოსტა"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={email.includes('@redberry.ge')}
            errorMessage="გამოიყენეთ @redberry.ge ფოსტა"
            successMessage="გამოიყენეთ @redberry.ge ფოსტა"
          />
          <FormField
            type="text"
            label="ტელეფონის ნომერი"
            placeholder="ტელეფონის ნომერი"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isValid={/^\d+$/.test(phone)}
            errorMessage="მხოლოდ რიცხვები"
            successMessage="მხოლოდ რიცხვები"
          />
        </div>

        <div className="w-full">
          <FormField
            type="image"
            label="ატვირთეთ ფოტო *"
            imageUrl={avatarPreview} 
            onImageUpload={handleImageUpload}
            onImageDelete={handleImageDelete}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Cta label="გაუქმება" size="m" type="secondary" onClick={onCancel} />
        <Cta label="დაამატე აგენტი" size="m" type="primary" onClick={handleAddAgent} />
      </div>
    </div>
  );
};

export default AddAgent;
