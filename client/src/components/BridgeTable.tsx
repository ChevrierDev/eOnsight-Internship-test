import React, { useState, useRef, useEffect } from 'react';
import action from "../assets/action.svg";
import OpenAddBridgeFormButton from '../components/OpenAddBridgeFormButton';

const BridgeTable: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-tableBg py-4 mt-40 w-[70%] ml-4 rounded-md flex flex-col px-5'>
      <div className="flex items-center justify-between w-full py-2">
        {/* bridge table info  */}
        <div className='flex flex-col space-y-2'>
          <h1 className="font-lato tracking-wide font-bold text-base text-white">Bridge Status Overview</h1>
          <p className="font-lato tracking-wide text-sm text-textSecondary/75">Current Conditions and Traffic Data</p>
        </div>
        {/* post new bridge button */}
        <div className='text-white'>
          <OpenAddBridgeFormButton />
        </div>
      </div>

      {/* bridge table content */}
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
            {/* Bridges Data */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-lato font-bold text-white">
                Golden Gate
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                San Francisco, CA
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                2023-01-01
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                Good
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-textSecondary/75">
                20000
              </td>
              <td className="relative px-6 py-4">
                <div className="relative" ref={dropdownRef}>
                  <button className="focus:outline-none" onClick={handleButtonClick}>
                    <img src={action} alt="action button" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20">
                      <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg" onClick={() => console.log('Edit')}>
                        Edit
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 font-lato tracking-wide rounded-lg" onClick={() => console.log('Delete')}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BridgeTable;
