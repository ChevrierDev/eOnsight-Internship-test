import axios from 'axios';
import { Bridges, BridgeResponse, FilterParams } from '../types';

const API_URL = 'http://127.0.0.1:8000/api/v1/bridges/';

// request to fetch bridges with pagination, search, and optional no-pagination
async function httpGetBridges(page = 1, search = '', noPagination = false): Promise<BridgeResponse> {
  try {
    const params: Record<string, string | number> = { page };
    if (search) {
      params.search = search;
    }
    if (noPagination) {
      params.no_pagination = 'true';
    }
    const response = await axios.get<BridgeResponse>(API_URL, { params });
    return response.data;
  } catch (err) {
    console.error('Error fetching bridges:', err);
    return { count: 0, results: [] };
  }
}

// request to fetch all bridges without pagination
async function httpGetAllBridges(): Promise<BridgeResponse> {
  try {
    const response = await axios.get<BridgeResponse>(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching all bridges:', err);
    return { count: 0, results: [] };
  }
}

// request to fetch bridge by ID
async function httpGetBridgeById(id: number) {
  try {
    const response = await axios.get<Bridges>(`${API_URL}${id}/`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching bridge with id ${id}:`, err);
    return null;
  }
}

// request to fetch add a new bridge
async function httpAddBridge(bridge: Omit<Bridges, 'id'>) {
  try {
    const response = await axios.post(API_URL, bridge);
    return { message: "Bridge added successfully", bridge: response.data };
  } catch (err) {
    console.error('Error adding bridge:', err);
    return { message: "Failed to add bridge" };
  }
}

// request to fetch update an existing bridge
async function httpUpdateBridge(id: number, updatedBridge: Omit<Bridges, 'id'>) {
  try {
    const response = await axios.put(`${API_URL}${id}/`, updatedBridge);
    return { message: `Bridge with id ${id} updated successfully`, bridge: response.data };
  } catch (err) {
    console.error(`Error updating bridge with id ${id}:`, err);
    return { message: `Failed to update bridge with id ${id}` };
  }
}

// request to fetch delete a bridge by ID
async function httpDeleteBridge(id: number): Promise<{ message: string }> {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return { message: `Bridge with id ${id} deleted successfully` };
  } catch (err) {
    console.error(`Error deleting bridge with id ${id}:`, err);
    return { message: `Failed to delete bridge with id ${id}` };
  }
}

// request to fetch bridges with filters applied
async function httpGetFilteredBridges(filters: FilterParams): Promise<BridgeResponse> {
  try {
    const params: Record<string, string | number> = {};
    if (filters.inspection_date) params.inspection_date = filters.inspection_date;
    if (filters.status) params.status = filters.status;
    if (filters.traffic_load_min !== undefined && filters.traffic_load_min !== '') params.traffic_load__gte = filters.traffic_load_min;
    if (filters.traffic_load_max !== undefined && filters.traffic_load_max !== '') params.traffic_load__lte = filters.traffic_load_max;

    const response = await axios.get<BridgeResponse>(API_URL, { params });
    return response.data;
  } catch (err) {
    console.error('Error fetching filtered bridges:', err);
    return { count: 0, results: [] };
  }
}

// request to fetch search bridges by name
async function httpSearchBridgesByName(name: string): Promise<Bridges[]> {
  try {
    const response = await axios.get<Bridges[]>(`${API_URL}search/`, { params: { name } });
    return response.data;
  } catch (err) {
    console.error('Error searching bridges by name:', err);
    return [];
  }
}

export {
  httpGetBridges,
  httpGetBridgeById,
  httpAddBridge,
  httpUpdateBridge,
  httpDeleteBridge,
  httpGetAllBridges,
  httpGetFilteredBridges,
  httpSearchBridgesByName
};
