import React, { useState, useRef, useEffect } from 'react';
import SubmitButton from './SubmitButton';

const BridgeForm: React.FC = () => {
  const [status, setStatus] = useState("Good");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setDropdownOpen(false);
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
    <div className='flex flex-col p-7 bg-tableBg w-[25%] rounded-md'>
      <h1 className="text-lg font-lato text-white tracking-wide">Add/Update Bridge</h1>

      <form action="" className='mt-5 space-y-4'>
        <div className='space-y-1'>
          <label htmlFor="name" className='font-lato text-textSecondary text-xs tracking-wider'>Bridge name</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input type="text" name='name' className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/80' placeholder='Golden Gate' />
          </div>
        </div>

        <div className='space-y-1'>
          <label htmlFor="latitude" className='font-lato text-textSecondary text-xs tracking-wider'>Latitude</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input type="text" name='latitude' className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/80' placeholder='40.7128 ' />
          </div>
        </div>

        <div className='space-y-1'>
          <label htmlFor="longitude" className='font-lato text-textSecondary text-xs tracking-wider'>Longitude</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input type="text" name='longitude' className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/80' placeholder='-74.0060' />
          </div>
        </div>

        <div className='space-y-1'>
          <label htmlFor="inspection_date" className='font-lato text-textSecondary text-xs tracking-wider'>Inspection Date</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input type="date" name='inspection_date' className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full' />
          </div>
        </div>

        <div className='space-y-1 relative' ref={dropdownRef}>
          <label htmlFor="status" className='font-lato text-textSecondary text-xs tracking-wider'>Status</label>
          <button 
            type="button"
            className='bg-inputBg px-3 py-4 rounded-lg font-lato text-white flex justify-between items-center w-full'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {status}
            <i className="fas fa-chevron-down"></i>
          </button>
          {dropdownOpen && (
            <div className='absolute z-10 bg-inputBg mt-1 w-full rounded-lg shadow-lg'>
              <button 
                type="button"
                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                onClick={() => handleStatusChange('Good')}
              >
                Good
              </button>
              <button 
                type="button"
                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                onClick={() => handleStatusChange('Fair')}
              >
                Fair
              </button>
              <button 
                type="button"
                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                onClick={() => handleStatusChange('Poor')}
              >
                Poor
              </button>
              <button 
                type="button"
                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                onClick={() => handleStatusChange('Bad')}
              >
                Bad
              </button>
            </div>
          )}
        </div>

        <div className='space-y-1'>
          <label htmlFor="trafic_load" className='font-lato text-textSecondary text-xs tracking-wider'>Traffic load</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input type="text" name='trafic_load' className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/80' placeholder='15000' />
          </div>
        </div>

        <div className='w-full flex items-center justify-center pt-4'>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default BridgeForm;
