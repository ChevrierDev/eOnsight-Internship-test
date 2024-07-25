import React, { useEffect, useState } from 'react';
import AppLayout from './AppLayouts.tsx';
import BridgeTable from '../components/BridgeTable.tsx';
import Header from '../components/Header';
import PieChart from '../components/PieChart.tsx';
import BridgeForm from '../components/BridgeForm.tsx';
import useBridges from '../hooks/useBridges';
import { Status, Bridges } from '../types/index.tsx';
import { toast } from 'react-toastify';
import BridgeTableMobile from '../components/BridgeTableMobile';

const Dashboard: React.FC = () => {
  const {
    bridges,
    allBridges,
    addBridge,
    updateBridge,
    deleteBridge,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useBridges();
  const [statusData, setStatusData] = useState({
    Good: 0,
    Fair: 0,
    Poor: 0,
    Bad: 0,
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const [bridgeToEdit, setBridgeToEdit] = useState<Bridges | null>(null);
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    const statusCount = { Good: 0, Fair: 0, Poor: 0, Bad: 0 };
    allBridges.forEach((bridge) => {
      if (statusCount[bridge.status] !== undefined) {
        statusCount[bridge.status]++;
      }
    });
    setStatusData(statusCount);
  }, [allBridges]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isFormOpen) {
        setFormOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isFormOpen]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleAddBridge = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBridge = {
      name: formData.get('name') as string,
      location: `POINT (${parseFloat(formData.get('longitude') as string)} ${parseFloat(formData.get('latitude') as string)})`,
      inspection_date: formatDate(formData.get('inspection_date') as string),
      status: formData.get('status') as Status,
      traffic_load: parseInt(formData.get('traffic_load') as string, 10),
    };
    await addBridge(newBridge);
    setFormOpen(false);
    setActiveButton(0);
  };

  const handleEditBridge = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (bridgeToEdit) {
      const updatedBridge = {
        name: formData.get('name') as string,
        location: `POINT (${parseFloat(formData.get('longitude') as string)} ${parseFloat(formData.get('latitude') as string)})`,
        inspection_date: formatDate(formData.get('inspection_date') as string),
        status: formData.get('status') as Status,
        traffic_load: parseInt(formData.get('traffic_load') as string, 10),
      };
      await updateBridge(bridgeToEdit.id, updatedBridge);
      setFormOpen(false);
      setBridgeToEdit(null);
      setActiveButton(0);
    }
  };

  const handleEditBridgeClick = (bridge: Bridges) => {
    setBridgeToEdit(bridge);
    setFormOpen(true);
    setActiveButton(0);
    toast.info('You are in edit mode');
  };

  const handleDeleteBridgeClick = async (id: number) => {
    await deleteBridge(id);
  };

  const handleAddBridgeClick = () => {
    setFormOpen(true);
    setBridgeToEdit(null);
    setActiveButton(1);
    toast.info('You are in add mode');
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setBridgeToEdit(null);
    setActiveButton(0);
  };

  return (
    <AppLayout>
      <Header
        onShowTable={() => setFormOpen(false)}
        onShowForm={handleAddBridgeClick}
        onShowChart={() => {
          setFormOpen(false);
          setActiveButton(2);
        }}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      <div className='flex flex-col lg:flex-row justify-between md:space-x-4 md:px-4'>
        <div className="flex flex-col w-full lg:w-full space-y-8">
          <PieChart data={statusData} className={`w-[25rem] h-[25rem] mx-auto mt-20 lg:mx-auto ${activeButton === 2 ? "block" : "hidden"} md:block md:mt-0`} />
          <BridgeTable
            className='w-full hidden md:block'
            onAddBridgeClick={handleAddBridgeClick}
            onEditBridgeClick={handleEditBridgeClick}
            onDeleteBridgeClick={handleDeleteBridgeClick}
            bridges={bridges}
          />
          {!isFormOpen && activeButton !== 2 && (
            <BridgeTableMobile
              className='w-full block md:hidden'
              bridges={bridges}
              onEditBridgeClick={handleEditBridgeClick}
              onDeleteBridge={handleDeleteBridgeClick}
            />
          )}
          {/* Pagination controls */}
          <div className={`flex justify-center space-x-2  md:block md:mt-0 w-fit mx-auto ${activeButton === 2 || isFormOpen  ? "hidden" : "block"}`}>
            <button
              className="text-white font-lato border font-bold py-2 px-4 rounded-md hover:scale-95 hover:bg-white/20 duration-200 ease-out cursor-pointer"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white py-2 px-4">{currentPage} / {totalPages}</span>
            <button
              className="text-white font-lato border font-bold py-2 px-4 rounded-md hover:scale-95 hover:bg-white/20 duration-200 ease-out cursor-pointer"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        {isFormOpen && (
          <BridgeForm
            title={bridgeToEdit ? "Edit Bridge Form" : "Add Bridge Form"}
            onSubmit={bridgeToEdit ? handleEditBridge : handleAddBridge}
            className='w-full mt-4 lg:w-1/4 md:mt-0'
            initialData={bridgeToEdit}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
