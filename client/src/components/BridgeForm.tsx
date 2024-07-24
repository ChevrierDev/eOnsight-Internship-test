import React, { useState, useRef, useEffect } from 'react';
import SubmitButton from './SubmitButton';
import { Status, Bridges } from '../types/index';

interface BridgeFormProps {
  className?: string;
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Bridges | null;
}

const BridgeForm: React.FC<BridgeFormProps> = ({ className, title, onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [status, setStatus] = useState<Status>('Good');
  const [trafficLoad, setTrafficLoad] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      const locationParts = initialData.location.replace('SRID=4326;POINT (', '').replace(')', '').split(' ');
      setLatitude(locationParts[1]);
      setLongitude(locationParts[0]);
      setInspectionDate(initialData.inspection_date);
      setStatus(initialData.status);
      setTrafficLoad(initialData.traffic_load.toString());
    } else {
      setName('');
      setLatitude('');
      setLongitude('');
      setInspectionDate('');
      setStatus('Good');
      setTrafficLoad('');
    }
  }, [initialData]);

  const handleStatusChange = (newStatus: Status) => {
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
    <div className={`flex flex-col p-7 bg-tableBg rounded-md ${className}`}>
      <h1 className="text-lg font-lato text-white tracking-wide">{title}</h1>
      <form onSubmit={onSubmit} className='mt-5 space-y-4'>
        <div className='space-y-1'>
          <label htmlFor="name" className='font-lato text-textSecondary text-xs tracking-wider'>Bridge name</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input
              type="text"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/30'
              placeholder='Golden Gate'
            />
          </div>
        </div>
        <div className='space-y-1'>
          <label htmlFor="latitude" className='font-lato text-textSecondary text-xs tracking-wider'>Latitude</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input
              type="text"
              name='latitude'
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/30'
              placeholder='40.7128'
            />
          </div>
        </div>
        <div className='space-y-1'>
          <label htmlFor="longitude" className='font-lato text-textSecondary text-xs tracking-wider'>Longitude</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input
              type="text"
              name='longitude'
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/30'
              placeholder='-74.0060'
            />
          </div>
        </div>
        <div className='space-y-1'>
          <label htmlFor="inspection_date" className='font-lato text-textSecondary text-xs tracking-wider'>Inspection Date</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input
              type="date"
              name='inspection_date'
              value={inspectionDate}
              onChange={(e) => setInspectionDate(e.target.value)}
              className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full'
            />
          </div>
        </div>
        <input type="hidden" name="status" value={status} />
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
          <label htmlFor="traffic_load" className='font-lato text-textSecondary text-xs tracking-wider'>Traffic load</label>
          <div className='bg-inputBg px-3 py-4 rounded-lg'>
            <input
              type="text"
              name='traffic_load'
              value={trafficLoad}
              onChange={(e) => setTrafficLoad(e.target.value)}
              className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/30'
              placeholder='15000'
            />
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
