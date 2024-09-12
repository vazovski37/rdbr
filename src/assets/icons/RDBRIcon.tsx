import React from 'react';
import RDBRLogo from '../../assets/images/RDBRLogo.png';

interface RDBRIconProps {
  onClick?: () => void;
}

const RDBRIcon = ( {onClick}:RDBRIconProps ) => {
  return (
    <div onClick={onClick}>
      <img src={RDBRLogo} alt="RDBR Logo" className="w-[150px] h-[24] cursor-pointer " />
    </div>
  );
};

export default RDBRIcon;
