import axios from 'axios';
import { CrimeData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCrimeData = async (filters?: any): Promise<CrimeData[]> => {
  try {
    const response = await api.get('/crimes', { params: filters });
    return response.data.map((item: any) => ({
      ...item,
      date: new Date(item.date)
    }));
  } catch (error) {
    console.error('Error fetching crime data:', error);
    throw error;
  }
};

export const fetchCrimeStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching crime stats:', error);
    throw error;
  }
};

export const fetchHeatmapData = async () => {
  try {
    const response = await api.get('/heatmap');
    return response.data;
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    throw error;
  }
};

export const predictCrimeTrends = async (location: string, crimeType: string) => {
  try {
    const response = await api.get('/predict', {
      params: { location, crime_type: crimeType }
    });
    return response.data;
  } catch (error) {
    console.error('Error predicting crime trends:', error);
    throw error;
  }
};

export default api;