import React from 'react';
import action from "../assets/action.svg";

const BridgeTable: React.FC = () => {
  
  return (
    <div className='bg-tableBg py-4 mt-40 w-[70%] ml-4 rounded-md flex flex-col px-5'>
        
        <div className="flex items-center justify-between  w-full py-2 ">
            {/* bridge table info  */}
            <div className='flex flex-col space-y-2'>
                <h1 className="font-lato tracking-wide font-bold text-base text-white">Bridge Status Overview</h1>
                <p className="font-lato tracking-wide  text-sm text-textSecondary/75">Current Conditions and Traffic Data</p>
            </div>
            {/* post new bridge button */}
            <div className='text-white'>
                Future bouton
            </div>
        </div>

        {/* bridge table content */}
        <div className="flex flex-col py-4 ">
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
                    </tr>
                </thead>
                <tbody className=' divide-y divide-white/5'>
                    {/* Bridges Data*/}
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
                        <button className="px-6 py-4">
                            <img src={action} alt="action button"className=''/>
                        </button>
                    </tr>
                    {/* Bridges Data*/}
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
                        <button className="px-6 py-4">
                            <img src={action} alt="action button"className=''/>
                        </button>
                    </tr>
                    {/* Bridges Data*/}
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
                        <button className="px-6 py-4">
                            <img src={action} alt="action button"className=''/>
                        </button>
                    </tr>
                </tbody>

            </table>

        </div>

        
    </div>
  );
};

export default BridgeTable; 
