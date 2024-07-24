import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  httpGetBridges,
  httpAddBridge,
  httpUpdateBridge,
  httpDeleteBridge,
} from './request';
import { Bridges } from '../types';

function useBridges() {
  const [bridges, setBridges] = useState<Bridges[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isPendingBridge, setPendingBridge] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBridges = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await httpGetBridges();
      if (response && Array.isArray(response.results)) {
        setBridges(response.results);
      } else {
        throw new Error('Fetched data is not valid');
      }
    } catch (err) {
      setError('Failed to fetch bridges.');
      toast.error('Failed to fetch bridges.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBridges();
  }, [getBridges]);

  const addBridge = async (bridge: Omit<Bridges, 'id'>) => {
    setPendingBridge(true);
    setError(null);
    const toastId = toast.loading("Adding bridge...");
    try {
      const response = await httpAddBridge(bridge);
      if (response.message === "Bridge added successfully" && response.bridge) {
        setBridges(prev => [...prev, response.bridge]);
        toast.update(toastId, { render: "Bridge added successfully", type: "success", isLoading: false, autoClose: 4000 });
      } else {
        setError(response.message);
        toast.update(toastId, { render: response.message, type: "error", isLoading: false, autoClose: 5000 });
      }
    } catch (err) {
      setError('Failed to add bridge.');
      toast.update(toastId, { render: 'Failed to add bridge.', type: "error", isLoading: false, autoClose: 4000 });
    } finally {
      setPendingBridge(false);
    }
  };

  const updateBridge = async (id: number, updatedBridge: Omit<Bridges, 'id'>) => {
    setPendingBridge(true);
    setError(null);
    const toastId = toast.loading("Updating bridge...");
    try {
      const response = await httpUpdateBridge(id, updatedBridge);
      if (response.message === `Bridge with id ${id} updated successfully` && response.bridge) {
        setBridges(prev => prev.map(bridge => bridge.id === id ? response.bridge : bridge));
        toast.update(toastId, { render: "Bridge updated successfully", type: "success", isLoading: false, autoClose: 5000 });
      } else {
        setError(response.message);
        toast.update(toastId, { render: response.message, type: "error", isLoading: false, autoClose: 5000 });
      }
    } catch (err) {
      setError(`Failed to update bridge with id ${id}.`);
      toast.update(toastId, { render: `Failed to update bridge with id ${id}.`, type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      setPendingBridge(false);
    }
  };

  const deleteBridge = async (id: number) => {
    setLoading(true);
    setError(null);
    const toastId = toast.loading("Deleting bridge...");
    try {
      const success = await httpDeleteBridge(id);
      if (success) {
        setBridges(prev => prev.filter(bridge => bridge.id !== id));
        toast.update(toastId, { render: "Bridge deleted successfully", type: "success", isLoading: false, autoClose: 5000 });
      } else {
        setError(`Failed to delete bridge with id ${id}.`);
        toast.update(toastId, { render: `Failed to delete bridge with id ${id}.`, type: "error", isLoading: false, autoClose: 5000 });
      }
    } catch (err) {
      setError(`Failed to delete bridge with id ${id}.`);
      toast.update(toastId, { render: `Failed to delete bridge with id ${id}.`, type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return {
    bridges,
    isLoading,
    isPendingBridge,
    error,
    getBridges,
    addBridge,
    updateBridge,
    deleteBridge,
  };
}

export default useBridges;
