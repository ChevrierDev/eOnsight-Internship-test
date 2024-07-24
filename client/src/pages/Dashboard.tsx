import React, { useEffect, useState } from 'react';
import AppLayout from './AppLayouts.tsx';
import BridgeTable from '../components/BridgeTable.tsx';
import Header from '../components/Header';
import PieChart from '../components/PieChart.tsx';
import BridgeForm from '../components/BridgeForm.tsx';
import useBridges from '../hooks/useBridges';
import { Status, Bridges } from '../types/index.tsx';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const { bridges, addBridge, updateBridge, deleteBridge } = useBridges();
  const [statusData, setStatusData] = useState({
    Good: 0,
    Fair: 0,
    Poor: 0,
    Bad: 0,
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const [bridgeToEdit, setBridgeToEdit] = useState<Bridges | null>(null);

  useEffect(() => {
    const statusCount = { Good: 0, Fair: 0, Poor: 0, Bad: 0 };
    bridges.forEach((bridge) => {
      if (statusCount[bridge.status] !== undefined) {
        statusCount[bridge.status]++;
      }
    });
    setStatusData(statusCount);
  }, [bridges]);

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
    }
  };

  const handleEditBridgeClick = (bridge: Bridges) => {
    setBridgeToEdit(bridge);
    setFormOpen(true);
    toast.info('You are in edit mode');
  };

  const handleDeleteBridgeClick = async (id: number) => {
    await deleteBridge(id);
    toast.info('Bridge deleted successfully');
  };

  return (
    <AppLayout>
      <Header />
      <div className='flex flex-col lg:flex-row justify-between space-x-4 px-4'>
        <div className="flex flex-col w-full lg:w-full space-y-8">
          <PieChart data={statusData} className="w-[25rem] h-[25rem] mx-auto lg:mx-auto " />
          <BridgeTable
            className='w-full'
            onAddBridgeClick={() => {
              setFormOpen(true);
              setBridgeToEdit(null);
              toast.info('You are in add mode');
            }}
            onEditBridgeClick={handleEditBridgeClick}
            onDeleteBridgeClick={handleDeleteBridgeClick} // Pass handleDeleteBridgeClick to BridgeTable
            bridges={bridges}
          />
        </div>
        {isFormOpen && (
          <BridgeForm
            title={bridgeToEdit ? "Edit Bridge Form" : "Add Bridge Form"}
            onSubmit={bridgeToEdit ? handleEditBridge : handleAddBridge}
            className='w-full lg:w-1/4'
            initialData={bridgeToEdit}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
