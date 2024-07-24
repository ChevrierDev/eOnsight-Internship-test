import React, { useState, useRef, useEffect, useCallback } from 'react';
import action from "../assets/action.svg";
import OpenAddBridgeFormButton from '../components/OpenAddBridgeFormButton';
import { Bridges } from '../types/index';
import { parseLocation } from '../utils/parseLocation';
import ConfirmationModal from '../components/ConfirmationModal';

interface BridgeTableProps {
  className?: string;
  onAddBridgeClick: () => void;
  onEditBridgeClick: (bridge: Bridges) => void;
  onDeleteBridgeClick: (id: number) => void;
  bridges: Bridges[];
}

const BridgeTable: React.FC<BridgeTableProps> = ({ className, onAddBridgeClick, onEditBridgeClick, onDeleteBridgeClick, bridges }) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bridgeToDelete, setBridgeToDelete] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleButtonClick = useCallback((id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  }, [dropdownOpen]);

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

  const confirmDelete = () => {
    if (bridgeToDelete !== null) {
      onDeleteBridgeClick(bridgeToDelete);
      setIsModalOpen(false);
      setBridgeToDelete(null); 
    }
  };

  return (
    <div className={`bg-tableBg rounded-md flex flex-col px-5 ${className}`}>
      <div className="flex items-center justify-between w-full py-2">
        <div className='flex flex-col space-y-2'>
          <h1 className="font-lato tracking-wide font-bold text-base text-white">Bridge Status Overview</h1>
          <p className="font-lato tracking-wide text-sm text-textSecondary/75">Current Conditions and Traffic Data</p>
        </div>
        <div className='text-white'>
          <OpenAddBridgeFormButton onClick={onAddBridgeClick} />
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
            {bridges.map((bridge, index) => {
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
