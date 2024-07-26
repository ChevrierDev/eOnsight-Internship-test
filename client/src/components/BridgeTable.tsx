import React, { useState, useRef, useEffect, useCallback } from 'react';
import action from "../assets/action.svg";
import OpenAddBridgeFormButton from '../components/OpenAddBridgeFormButton';
import { Bridges } from '../types/index';
import { parseLocation } from '../utils/parseLocation';
import ConfirmationModal from '../components/ConfirmationModal';
import iconFilter from "../assets/filterIcon.svg";
import search from "../assets/search.svg";

interface BridgeTableProps {
  className?: string;
  onAddBridgeClick: () => void;
  onEditBridgeClick: (bridge: Bridges) => void;
  onDeleteBridgeClick: (id: number) => void;
  bridges: Bridges[];
  onFilterButtonClick: () => void;
  isFilterFormVisible: boolean;
  onSearchChange: (searchTerm: string) => void; 
}

const BridgeTable: React.FC<BridgeTableProps> = ({ 
  className, 
  onAddBridgeClick, 
  onEditBridgeClick, 
  onDeleteBridgeClick, 
  onFilterButtonClick, 
  bridges, 
  onSearchChange  
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bridgeToDelete, setBridgeToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');  
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // toggle dropdown menu for actions
  const handleButtonClick = useCallback((id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  }, [dropdownOpen]);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen !== null) {
        const ref = dropdownRefs.current[dropdownOpen];
        if (ref && !ref.contains(event.target as Node)) {
          setDropdownOpen(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // handle delete bridge action
  const handleDeleteClick = (id: number) => {
    setBridgeToDelete(id);
    setIsModalOpen(true);
    setDropdownOpen(null);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 300);
  };

  // confirm delete action
  const confirmDelete = () => {
    if (bridgeToDelete !== null) {
      onDeleteBridgeClick(bridgeToDelete);
      setIsModalOpen(false);
      setBridgeToDelete(null); 
    }
  };

  // handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);  
  };

  const filteredBridges = bridges.filter((bridge) =>
    bridge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-tableBg rounded-md flex flex-col px-5 ${className}`}>
      <div className="flex items-center justify-between w-full py-2">
        <div className='flex flex-col space-y-2'>
          <h1 className="font-lato tracking-wide font-bold text-base text-white">Bridge Status Overview</h1>
          <p className="font-lato tracking-wide text-sm text-textSecondary/75">Current Conditions and Traffic Data</p>
        </div>
        {/* Search input */}
        <div className="relative w-4/12 text-white pb-2.5">
          <img src={search} alt="search input" className="absolute right-4 top-2 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}  
            onChange={handleSearchChange} 
            className="pl-8 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-text-gray-300 w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-x-8">
          {/* Open filter button */}
          <button className='flex space-x-2.5' onClick={onFilterButtonClick}>
            <img src={iconFilter} alt="filter icon" />
            <p className="font-lato font-bold text-white">Filters</p>
          </button>
          <div className=' text-white '>
            {/* Open add bridges form button */}
            <OpenAddBridgeFormButton onClick={onAddBridgeClick} />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-4">
        <table className="min-w-full divide-y divide-white/5">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Bridge Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Inspection Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Traffic Load
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {filteredBridges.map((bridge, index) => {
              const { latitude, longitude } = parseLocation(bridge.location);
              return (
                <tr key={bridge.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-lato font-bold text-white">
                    {bridge.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                    {latitude}, {longitude}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                    {new Date(bridge.inspection_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                    {bridge.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                    {bridge.traffic_load}
                  </td>
                  <td className="relative px-6 py-4">
                    <div className="relative" ref={el => dropdownRefs.current[index] = el}>
                      <button className="focus:outline-none" onClick={() => handleButtonClick(index)}>
                        <img src={action} alt="action button" />
                      </button>
                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20">
                          <button
                            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg"
                            onClick={() => {
                              onEditBridgeClick(bridge);
                              setDropdownOpen(null); 
                            }}
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BridgeTable;
