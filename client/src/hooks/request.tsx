import axios from 'axios';
import { Bridges } from '../types';

const API_URL = 'http://127.0.0.1:8000/api/v1/bridges/';

async function httpGetBridges() {
  try {
    const response = await axios.get<Bridges[]>(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching bridges:', err);
    return [];
  }
}

async function httpGetBridgeById(id: number) {
  try {
    const response = await axios.get<Bridges>(`${API_URL}${id}/`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching bridge with id ${id}:`, err);
    return null;
  }
}

async function httpAddBridge(bridge: Omit<Bridges, 'id'>) {
    try {
      await axios.post(API_URL, bridge);
      return { message: "Bridge added successfully" };
    } catch (err) {
      console.error('Error adding bridge:', err);
      return { message: "Failed to add bridge" };
    }
  }
  
  async function httpUpdateBridge(id: number, updatedBridge: Omit<Bridges, 'id'>) {
    try {
      await axios.put(`${API_URL}${id}/`, updatedBridge);
      return { message: `Bridge with id ${id} updated successfully` };
    } catch (err) {
      console.error(`Error updating bridge with id ${id}:`, err);
      return { message: `Failed to update bridge with id ${id}` };
    }
  }

async function httpDeleteBridge(id: number) {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return true;
  } catch (err) {
    console.error(`Error deleting bridge with id ${id}:`, err);
    return false;
  }
}

export {
  httpGetBridges,
  httpGetBridgeById,
  httpAddBridge,
  httpUpdateBridge,
  httpDeleteBridge,
};
