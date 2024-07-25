import React, { useState } from 'react';
import { Bridges } from '../types/index';
import search from '../assets/search.svg';
import action from '../assets/action.svg';
import ConfirmationModal from '../components/ConfirmationModal';

interface BridgeTableMobileProps {
  className?: string;
  bridges: Bridges[];
  onEditBridgeClick: (bridge: Bridges) => void;
  onDeleteBridge: (id: number) => Promise<void>;
}

const parseLocation = (location: string): string => {
  const match = location.match(/POINT \(([^)]+)\)/);
  return match ? match[1] : location;
};

const BridgeTableMobile: React.FC<BridgeTableMobileProps> = ({ className, bridges, onEditBridgeClick, onDeleteBridge }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bridgeToDelete, setBridgeToDelete] = useState<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleEditClick = (bridge: Bridges) => {
    onEditBridgeClick(bridge);
    setDropdownOpen(null);
  };

  const handleDeleteClick = (id: number) => {
    setBridgeToDelete(id);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const confirmDelete = async () => {
    if (bridgeToDelete !== null) {
      await onDeleteBridge(bridgeToDelete);
      setBridgeToDelete(null);
      setIsModalOpen(false);
    }
  };

  const filteredBridges = bridges.filter((bridge) =>
    bridge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-tableBg rounded-md p-4 ${className}`}>
      <div className="flex items-center justify-between w-full py-2 px-3">
        <div className='flex flex-col space-y-2'>
          <h1 className="font-lato tracking-wide font-bold text-base text-white">Bridge Status Overview</h1>
          <p className="font-lato tracking-wide text-sm text-textSecondary/75">Current Conditions and Traffic Data</p>
        </div>
        <div className="relative block text-white md:hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-text-gray-300 focus:outline-none"
          />
          <img src={search} alt="search input" className="absolute left-2 top-2 w-5 h-5" />
        </div>
      </div>

      <div className='mt-4'>
        {filteredBridges.map((bridge) => (
          <div key={bridge.id} className="flex items-center justify-between bg-tableBg p-4 mb-4 border-b border-b-white/5">
            <div className="flex flex-col">
              <h2 className="font-lato text-lg font-bold text-white space-y-2">{bridge.name}</h2>
              <p className="font-lato text-sm text-textSecondary/75">Location: {parseLocation(bridge.location)}</p>
              <p className="font-lato text-sm text-textSecondary/75">Inspection Date: {new Date(bridge.inspection_date).toLocaleDateString()}</p>
              <p className="font-lato text-sm text-textSecondary/75">Condition: {bridge.status}</p>
              <p className="font-lato text-sm text-textSecondary/75">Traffic Load: {bridge.traffic_load}</p>
            </div>
            <div className="relative">
              <button className="focus:outline-none" onClick={() => handleButtonClick(bridge.id)}>
                <img src={action} alt="action button" />
              </button>
              {dropdownOpen === bridge.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20">
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg"
                    onClick={() => handleEditClick(bridge)}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg"
                    onClick={() => handleDeleteClick(bridge.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BridgeTableMobile;
