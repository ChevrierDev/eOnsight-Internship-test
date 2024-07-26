import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  httpGetBridges,
  httpGetAllBridges,
  httpAddBridge,
  httpUpdateBridge,
  httpDeleteBridge,
  httpGetFilteredBridges,
  httpSearchBridgesByName,
} from './request';
import { Bridges, BridgeResponse, FilterParams } from '../types';

function useBridges() {
  const [bridges, setBridges] = useState<Bridges[]>([]);
  const [allBridges, setAllBridges] = useState<Bridges[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isPendingBridge, setPendingBridge] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch bridges with pagination and search term
  const getBridges = useCallback(async (page = 1, search = '', noPagination = false) => {
    setLoading(true);
    setError(null);
    try {
      const response: BridgeResponse = await httpGetBridges(page, search, noPagination);
      if (response && Array.isArray(response.results)) {
        setBridges(response.results);
        setTotalPages(Math.ceil(response.count / 10));
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

  // fetch all bridges without pagination
  const getAllBridges = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: BridgeResponse = await httpGetAllBridges();
      if (response && Array.isArray(response.results)) {
        setAllBridges(response.results);
      } else {
        throw new Error('Fetched data is not valid');
      }
    } catch (err) {
      setError('Failed to fetch all bridges.');
      toast.error('Failed to fetch all bridges.');
    } finally {
      setLoading(false);
    }
  }, []);

  // handle search input change
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim()) {
      searchBridgesByName(newSearchTerm);
    } else {
      getBridges(1, '');
    }
  };

  // fetch bridges by name
  const searchBridgesByName = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: Bridges[] = await httpSearchBridgesByName(name);
      setBridges(response);
      setTotalPages(1);
    } catch (err) {
      setError('Failed to fetch bridges by name.');
      toast.error('Failed to fetch bridges by name.');
    } finally {
      setLoading(false);
    }
  };

  // initial fetch for bridges and all bridges
  useEffect(() => {
    if (!searchTerm) {
      getBridges(currentPage, searchTerm);
    }
  }, [getBridges, currentPage, searchTerm]);

  useEffect(() => {
    getAllBridges();
  }, [getAllBridges]);

  // add a new bridge
  const addBridge = async (bridge: Omit<Bridges, 'id'>) => {
    setPendingBridge(true);
    setError(null);
    const toastId = toast.loading("Adding bridge...");
    try {
      const response = await httpAddBridge(bridge);
      if (response.message === "Bridge added successfully" && response.bridge) {
        getBridges(currentPage, searchTerm);
        getAllBridges();
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

  // update an existing bridge
  const updateBridge = async (id: number, updatedBridge: Omit<Bridges, 'id'>) => {
    setPendingBridge(true);
    setError(null);
    const toastId = toast.loading("Updating bridge...");
    try {
      const response = await httpUpdateBridge(id, updatedBridge);
      if (response.message === `Bridge with id ${id} updated successfully` && response.bridge) {
        getBridges(currentPage, searchTerm);
        getAllBridges();
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

  // delete an existing bridge
  const deleteBridge = async (id: number) => {
    setLoading(true);
    setError(null);
    const toastId = toast.loading("Deleting bridge...");
    try {
      const success = await httpDeleteBridge(id);
      if (success) {
        getBridges(currentPage, searchTerm);
        getAllBridges();
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

  // apply filters to the bridge list
  const applyFilters = async (filters: FilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const response: BridgeResponse = await httpGetFilteredBridges(filters);
      if (response && Array.isArray(response.results)) {
        setBridges(response.results);
        setTotalPages(Math.ceil(response.count / 10));
      } else {
        throw new Error('Fetched data is not valid');
      }
    } catch (err) {
      setError('Failed to apply filters.');
      toast.error('Failed to apply filters.');
    } finally {
      setLoading(false);
    }
  };

  return {
    bridges,
    allBridges,
    isLoading,
    isPendingBridge,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    getBridges,
    addBridge,
    updateBridge,
    deleteBridge,
    applyFilters,
    handleSearchChange,  
    searchBridgesByName
  };
}

export default useBridges;
