import axios from 'axios';
import {Platform} from 'react-native';

// Base URL for the mock API server
// Use your computer's IP address for React Native to access the API
const BASE_URL = 'http://192.168.31.153:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed)
apiClient.interceptors.request.use(
  config => {
    // You can add auth tokens here
    // config.headers.Authorization = `Bearer ${token}`;
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  },
);

// User data API endpoints
export const userAPI = {
  getUser: () => apiClient.get('/user'),
  updateUser: (userData: any) => apiClient.put('/user', userData),
};

// Debit card API endpoints
export const debitCardAPI = {
  getCard: () => apiClient.get('/debitCard'),
  updateCard: (cardData: any) => apiClient.put('/debitCard', cardData),
};

// Spending limit API endpoints
export const spendingLimitAPI = {
  getSpendingLimit: () => apiClient.get('/spendingLimit'),
  updateSpendingLimit: (limitData: any) =>
    apiClient.put('/spendingLimit', limitData),
  setWeeklyLimit: (limit: number) =>
    apiClient.patch('/spendingLimit', {
      weeklyLimit: limit,
      isActive: limit > 0,
      lastUpdated: new Date().toISOString(),
    }),
};

// Transaction history API endpoints
export const transactionsAPI = {
  getTransactions: () => apiClient.get('/transactions'),
  addTransaction: (transactionData: any) =>
    apiClient.post('/transactions', transactionData),
};

// Card settings API endpoints
export const cardSettingsAPI = {
  getSettings: () => apiClient.get('/cardSettings'),
  updateSetting: (settingId: number, settingData: any) =>
    apiClient.patch(`/cardSettings/${settingId}`, settingData),
};

// Helper function to simulate network delay (for testing loading states)
export const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export default apiClient;
