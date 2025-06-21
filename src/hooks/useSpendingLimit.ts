import {useState, useEffect} from 'react';
import {spendingLimitAPI, delay} from '../services/api';

interface SpendingLimitData {
  id: number;
  userId: number;
  weeklyLimit: number;
  currentSpending: number;
  isActive: boolean;
  lastUpdated: string;
}

interface UseSpendingLimitReturn {
  data: SpendingLimitData | null;
  loading: boolean;
  error: string | null;
  updateLimit: (limit: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useSpendingLimit = (): UseSpendingLimitReturn => {
  const [data, setData] = useState<SpendingLimitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpendingLimit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add artificial delay to show loading state
      await delay(1000);

      const response = await spendingLimitAPI.getSpendingLimit();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch spending limit');
      console.error('Error fetching spending limit:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateLimit = async (limit: number) => {
    try {
      setLoading(true);
      setError(null);

      // Add artificial delay to show loading state
      await delay(500);

      const response = await spendingLimitAPI.setWeeklyLimit(limit);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to update spending limit');
      console.error('Error updating spending limit:', err);
      throw err; // Re-throw so calling component can handle it
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchSpendingLimit();
  };

  useEffect(() => {
    fetchSpendingLimit();
  }, []);

  return {
    data,
    loading,
    error,
    updateLimit,
    refetch,
  };
};
