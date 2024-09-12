import React from 'react';
import RDBRIcon from '../../assets/icons/RDBRIcon'; // Import your RDBRIcon component (adjust the path as needed)
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full relative bg-white border-gainsboro border-[1px] border-solid box-border h-[100px] flex flex-col items-start justify-start py-[38px] px-[162px]">
      <RDBRIcon onClick={()=>{navigate('/')}} />
    </div>
  );
};

export default Header;
