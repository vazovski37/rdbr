import React, { useState } from 'react';
import AddAgent from '../components/add-agent';

const useAgentModal = () => {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState<boolean>(false);

  const openAgentModal = () => {
    setIsAgentModalOpen(true);
  };

  const closeAgentModal = () => {
    setIsAgentModalOpen(false);
  };

  const handleAddAgentSuccess = () => {
    setIsAgentModalOpen(false);
    // Add any additional logic needed after adding an agent, like refreshing data
  };

  const AgentModal: React.FC = () => (
    <>
      {isAgentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[1000px] h-[784px]">
            <AddAgent onCancel={closeAgentModal} onAddAgentSuccess={handleAddAgentSuccess} />
          </div>
        </div>
      )}
    </>
  );

  return { openAgentModal, closeAgentModal, handleAddAgentSuccess, AgentModal };
};

export default useAgentModal;
