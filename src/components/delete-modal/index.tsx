import React from 'react';
import Cta from '../../design-system/cta'; // Assuming Cta is your button component

interface DeleteModalProps {
  onConfirm: () => void; 
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-[170px] py-[60px] bg-white shadow-lg rounded-xl max-w-md mx-auto">
      {/* Icon */}
      <div onClick={onCancel} className="absolute top-[6px] right-[13px] cursor-pointer w-[47px] h-[47px] flex justify-center items-center ">
      <span className="material-symbols-outlined">close</span>
      </div>

      {/* Modal Text */}
      <div className="text-lg font-medium mb-[35px]">
        გსურთ წაშალოთ ლისტინგი?
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Cta
          label="გაუქმება"
          type="secondary"
          size="s"
          className="w-full"
          onClick={onCancel}
        />
        <Cta
          label="დადასტურება"
          type="primary"
          size="s"
          className="w-full"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
