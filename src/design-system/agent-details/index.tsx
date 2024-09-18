import React, { FunctionComponent } from 'react';

// Define the props interface for the AgentDetails component
interface AgentDetailsProps {
  name: string; // Agent's name
  role: string; // Agent's role (e.g., "Agent")
  imageSrc: string; // URL for the agent's image
  email: string; // Agent's email
  phone: string; // Agent's phone number
}

const AgentDetails: FunctionComponent<AgentDetailsProps> = ({ name, role, imageSrc, email, phone }) => {
  return (
    <div className="w-full relative rounded-lg border-gainsboro border-[1px] border-solid box-border h-[174px] overflow-hidden shrink-0 text-left text-sm text-lightslategray font-firago">
      {/* Agent Image */}
      <img
        className="absolute top-[24px] left-[20px] rounded-[100px] w-[72px] h-[72px] object-cover"
        alt={name}
        src={imageSrc}
      />
      
      {/* Agent Name */}
      <div className="absolute top-[40px] left-[106px] text-[16px] text-gray">{name}</div>
      
      {/* Agent Role */}
      <div className="absolute top-[63px] left-[106px] text-dimgray">{role}</div>
      
      {/* Agent Email */}
      <div className="absolute top-[112px] left-[20px] flex flex-row items-center justify-start gap-[5px]">
      <span className="material-symbols-outlined text-[15px]">mail</span>
        <div className="relative">{email}</div>
      </div>
      
      {/* Agent Phone */}
      <div className="absolute top-[133px] left-[20px] flex flex-row items-center justify-start gap-[5px]">
      <span className="material-symbols-outlined text-[15px]">phone_in_talk</span>
        <div className="relative">{phone}</div>
      </div>
    </div>
  );
};

export default AgentDetails;
