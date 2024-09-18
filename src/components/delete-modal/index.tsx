import React from 'react';
import Cta from '../../design-system/cta'; // Assuming Cta is your button component

interface DeleteModalProps {
  onConfirm: () => void; 
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto">
      {/* Icon */}
      <div onClick={onCancel} className="absolute top-[6px] right-[13px] cursor-pointer w-[47px] h-[47px] flex justify-center items-center ">
      <span className="material-symbols-outlined">close</span>
      </div>

      {/* Modal Text */}
      <div className="text-lg font-medium mb-6">
        გსურთ წაშალოთ ლისტინგი?
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 w-full">
        <Cta
          label="გაუქმება"
          type="secondary"
          size="m"
          className="w-full"
          onClick={onCancel}
        />
        <Cta
          label="დადასტურება"
          type="primary"
          size="m"
          className="w-full"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
