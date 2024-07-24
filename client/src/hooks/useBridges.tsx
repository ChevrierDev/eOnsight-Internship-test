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
      const fetchedBridges = await httpGetBridges();
      setBridges(fetchedBridges);
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

  const addBridge = useCallback(async (bridge: Omit<Bridges, 'id'>) => {
    setPendingBridge(true);
    setError(null);
    const toastId = toast.loading("Adding bridge...");
    try {
      const response = await httpAddBridge(bridge);
      if (response.message === "Bridge added successfully") {
        await getBridges();
        toast.update(toastId, { render: "Bridge added successfully", type: "success", isLoading: false, autoClose: 5000 });
      } else {
        setError(response.message);
        toast.update(toastId, { render: response.message, type: "error", isLoading: false, autoClose: 5000 });
      }
    } catch (err) {
      setError('Failed to add bridge.');
      toast.update(toastId, { render: 'Failed to add bridge.', type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      setPendingBridge(false);
    }
  }, [getBridges]);

  const updateBridge = useCallback(async (id: number, bridge: Omit<Bridges, 'id'>) => {
    setPendingBridge(true);
    setError(null);
    const toastId = toast.loading("Updating bridge...");
    try {
      const response = await httpUpdateBridge(id, bridge);
      if (response.message === `Bridge with id ${id} updated successfully`) {
        await getBridges();
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
  }, [getBridges]);

  const deleteBridge = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    const toastId = toast.loading("Deleting bridge...");
    try {
      const success = await httpDeleteBridge(id);
      if (success) {
        await getBridges();
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
  }, [getBridges]);

  return {
    bridges,
    isLoading,
    isPendingBridge,
    error,
    addBridge,
    updateBridge,
    deleteBridge,
  };
}

export default useBridges;
