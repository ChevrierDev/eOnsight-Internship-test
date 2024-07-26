import React, { useState, useEffect } from 'react';
import CloseIcon from '../assets/closeBtn.svg';

interface FilterFormProps {
    handleFilterForm: (filters: { 
        inspection_date?: string; 
        status?: 'Good' | 'Fair' | 'Bad' | 'Poor'; 
        traffic_load_min?: number | ''; 
        traffic_load_max?: number | ''; 
    }) => void;
    onClose: () => void;
}

const FilterForm: React.FC<FilterFormProps & { className?: string }> = ({ handleFilterForm, onClose, className }) => {
    const [inspection_date, setInspectionDate] = useState('');
    const [status, setStatus] = useState<'Good' | 'Fair' | 'Bad' | 'Poor' | undefined>();
    const [traffic_load_min, setTrafficLoadMin] = useState<number | ''>('');
    const [traffic_load_max, setTrafficLoadMax] = useState<number | ''>('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleFilterForm({ inspection_date, status, traffic_load_min, traffic_load_max });
        onClose();
    };

    // Handle reset form
    const handleReset = () => {
        setInspectionDate('');
        setStatus(undefined);
        setTrafficLoadMin('');
        setTrafficLoadMax('');
        handleFilterForm({ inspection_date: '', status: undefined, traffic_load_min: '', traffic_load_max: '' });
        onClose();
    };

    // Toggle dropdown menu
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle status selection from dropdown
    const handleStatusSelect = (selectedStatus: 'Good' | 'Fair' | 'Bad' | 'Poor') => {
        setStatus(selectedStatus);
        setDropdownOpen(false);
    };

    // Close filter form on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                onClose();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [onClose]);

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className="bg-tableBg py-8 px-4 flex flex-col items-start w-full h-full p-4 rounded-md shadow-md space-y-4">
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-lato text-white font-bold tracking-wide text-lg">Filter Property</h1>
                    <button type="button" className="cursor-pointer" onClick={onClose}>
                        <img src={CloseIcon} alt="close btn icon" />
                    </button>
                </div>

                <div className='space-y-1.5 w-full'>
                    <label htmlFor="inspection_date" className='font-lato text-textSecondary text-sm tracking-wider'>Inspection Date</label>
                    <div className='bg-inputBg w-full px-3 py-4 rounded-lg'>
                        <input
                            type="date"
                            name='inspection_date'
                            value={inspection_date}
                            onChange={(e) => setInspectionDate(e.target.value)}
                            className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full'
                        />
                    </div>
                </div>

                <input type="hidden" name="status" value={status} />
                <div className='space-y-1 relative w-full'>
                    <label htmlFor="status" className='font-lato text-textSecondary text-xs tracking-wider'>Status</label>
                    <button 
                        type="button"
                        className='bg-inputBg px-3 py-4 rounded-lg font-lato text-white flex justify-between items-center w-full'
                        onClick={toggleDropdown}
                    >
                        {status || 'Select status'}
                        <i className="fas fa-chevron-down"></i>
                    </button>
                    
                    {dropdownOpen && (
                        <div className='absolute z-10 bg-inputBg mt-1 w-full rounded-lg shadow-lg'>
                            <button 
                                type="button"
                                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                                onClick={() => handleStatusSelect('Good')}
                            >
                                Good
                            </button>
                            <button 
                                type="button"
                                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                                onClick={() => handleStatusSelect('Fair')}
                            >
                                Fair
                            </button>
                            <button 
                                type="button"
                                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                                onClick={() => handleStatusSelect('Bad')}
                            >
                                Bad
                            </button>
                            <button 
                                type="button"
                                className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700'
                                onClick={() => handleStatusSelect('Poor')}
                            >
                                Poor
                            </button>
                        </div>
                    )}
                </div>

                <div className='space-y-1 w-full'>
                    <label htmlFor="traffic_load" className='font-lato text-textSecondary text-xs tracking-wider'>Traffic load</label>
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="min" className='font-lato text-textSecondary text-xs tracking-wider'>Min</label>
                            <div className='bg-inputBg px-3 py-4 rounded-lg'>
                                <input
                                    type="text"
                                    name='traffic_load_min'
                                    value={traffic_load_min}
                                    onChange={(e) => setTrafficLoadMin(e.target.value === '' ? '' : Number(e.target.value))}
                                    className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/30'
                                    placeholder='15000'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="max" className='font-lato text-textSecondary text-xs tracking-wider'>Max</label>
                            <div className='bg-inputBg px-3 py-4 rounded-lg'>
                                <input
                                    type="text"
                                    name='traffic_load_max'
                                    value={traffic_load_max}
                                    onChange={(e) => setTrafficLoadMax(e.target.value === '' ? '' : Number(e.target.value))}
                                    className='flex-1 font-lato text-white outline-none bg-transparent w-full h-full placeholder:font-lato placeholder:text-white/30'
                                    placeholder='50000'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                        
                <button type="submit" className='w-[90%] bg-buttonPrimary py-2 mx-auto rounded-md font-lato text-white font-bold tracking-wide hover:scale-95 duration-200 ease-out'>
                    Filtrer
                </button>

                <button type="button" className='mx-auto' onClick={handleReset}>
                    <p className="text-white tracking-wider font-lato text-sm underline hover:text-buttonPrimary duration-200">
                        Reset
                    </p>
                </button>
            </form>
        </div>
    );
};

export default FilterForm;
