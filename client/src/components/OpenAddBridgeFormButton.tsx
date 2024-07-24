import React from 'react';

interface OpenAddBridgeFormButtonProps {
  onClick: () => void;
}

const OpenAddBridgeFormButton: React.FC<OpenAddBridgeFormButtonProps> = ({ onClick }) => {
  return (
    <button
      className='bg-buttonPrimary p-2 font-lato text-white rounded-lg w-48 flex items-center justify-center hover:bg-buttonPrimary/50 hover:scale-95 duration-200 tracking-wide'
      onClick={onClick}
    >
      <i className="fas fa-plus mr-2"></i>
      Add new bridge
    </button>
  );
};

export default OpenAddBridgeFormButton;
