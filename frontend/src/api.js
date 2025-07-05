import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/orders';

export const fetchOrders = (filters) => {
  // Remove empty, null, or undefined values
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  );

  return axios.get(`${API_BASE}/filter`, { params: cleanedFilters });
};
