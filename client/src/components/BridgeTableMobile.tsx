import React, { useState, useEffect } from 'react';
import { Bridges } from '../types/index';
import search from '../assets/search.svg';
import action from '../assets/action.svg';
import ConfirmationModal from '../components/ConfirmationModal';
import iconFilter from '../assets/filterIcon.svg';
import garbageIcon from "../assets/garbageIcon.svg";
import editIcon from "../assets/editIcon.svg";
import locateIcon from "../assets/locateIcon.svg";
import Map from '../components/Map'; // Import the Map component

interface BridgeTableMobileProps {
  className?: string;
  bridges: Bridges[];
  onEditBridgeClick: (bridge: Bridges) => void;
  onDeleteBridge: (id: number) => Promise<void>;
  onShowFilterForm: () => void;
  onSearchChange: (searchTerm: string) => void;
}

// Parses the location string to extract latitude and longitude
const parseLocation = (location: string): { latitude: number, longitude: number } => {
  const match = location.match(/POINT \(([^)]+)\)/);
  if (match) {
    const [longitude, latitude] = match[1].split(' ').map(Number);
    return { latitude, longitude };
  }
  return { latitude: 0, longitude: 0 };
};

const BridgeTableMobile: React.FC<BridgeTableMobileProps> = ({
  className,
  bridges,
  onEditBridgeClick,
  onDeleteBridge,
  onShowFilterForm,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');  
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bridgeToDelete, setBridgeToDelete] = useState<number | null>(null);
  const [showMap, setShowMap] = useState<{ latitude: number, longitude: number } | null>(null); 

  // handles changes in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm); 
  };

  // toggles the dropdown menu for the actions
  const handleButtonClick = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // handles the edit button click
  const handleEditClick = (bridge: Bridges) => {
    onEditBridgeClick(bridge);
    setDropdownOpen(null);
  };

  // handles the delete button click and opens the confirmation modal
  const handleDeleteClick = (id: number) => {
    setBridgeToDelete(id);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  // confirms the delete action and calls the delete function
  const confirmDelete = async () => {
    if (bridgeToDelete !== null) {
      await onDeleteBridge(bridgeToDelete);
      setBridgeToDelete(null);
      setIsModalOpen(false);
    }
  };

  // shows the map with the given coordinates
  const handleShowMap = (latitude: number, longitude: number) => {
    setShowMap({ latitude, longitude });
  };

  // closes the map modal
  const handleCloseMap = () => {
    setShowMap(null);
  };
  

  // filters the bridges based on the search term
  const filteredBridges = bridges.filter((bridge) =>
    bridge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // close the action dropdown if the screen is smaller than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDropdownOpen(null); 
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`bg-tableBg rounded-md p-4 ${className}`}>
      <div className="flex items-center justify-between w-full py-2 px-3">
        <div className='flex flex-col space-y-2'>
          <h1 className="font-lato tracking-wide font-bold text-base text-white">Bridge Status Overview</h1>
          <p className="font-lato tracking-wide text-sm text-textSecondary/75">Current Conditions and Traffic Data</p>
        </div>
        
        <div className="flex flex-col items-end justify-center space-y-2.5">
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
          
          <button className='flex space-x-2.5 mr-2' onClick={onShowFilterForm}>
            <img src={iconFilter} alt="filter icon" />
            <p className="font-lato font-bold text-white">Filters</p>
          </button>
        </div>
      </div>
      
      <div className='mt-4'>
        {filteredBridges.map((bridge) => {
          const { latitude, longitude } = parseLocation(bridge.location);
          return (
            <div key={bridge.id} className="flex items-center justify-between bg-tableBg p-4 mb-4 border-b border-b-white/5">
              <div className="flex flex-col space-y-2">
                <h2 className="font-lato text-lg font-bold text-white space-y-2 tracking-wide">{bridge.name}</h2>
                <p className="font-lato text-sm text-textSecondary/75 tracking-wide">Location: {latitude}, {longitude}</p>
                <p className="font-lato text-sm text-textSecondary/75 tracking-wide">Inspection Date: {new Date(bridge.inspection_date).toLocaleDateString()}</p>
                <p className="font-lato text-sm text-textSecondary/75 tracking-wide">Condition: {bridge.status}</p>
                <p className="font-lato text-sm text-textSecondary/75 tracking-wide">Traffic Load: {bridge.traffic_load}</p>
              </div>
              <div className="relative">
                <button className="focus:outline-none" onClick={() => handleButtonClick(bridge.id)}>
                  <img src={action} alt="action button" />
                </button>
                {dropdownOpen === bridge.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20">
                    <button
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg"
                      onClick={() => handleEditClick(bridge)}
                    >
                      <img src={editIcon} alt="edit icon" />
                      <p>Edit</p>
                    </button>
                    <button
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg"
                      onClick={() => handleDeleteClick(bridge.id)}
                    >
                      <img src={garbageIcon} alt="garbage icon" />
                      <p>Delete</p>                     
                    </button>
                    <button
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg"
                      onClick={() => handleShowMap(latitude, longitude)}
                    >
                      <img src={locateIcon} alt="locate icon" />
                      <p>Locate</p>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg w-full h-3/4">
            <button
              onClick={handleCloseMap}
              className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-1 z-50"
            >
              &times;
            </button>
            <Map latitude={showMap.latitude} longitude={showMap.longitude} onCloseMap={handleCloseMap} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeTableMobile;
