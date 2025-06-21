import {useState, useEffect} from 'react';
import {transactionsAPI, delay} from '../services/api';

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  description: string;
  date: string;
  type: 'debit' | 'credit';
  category: string;
  merchant: string;
}

interface UseTransactionsReturn {
  data: Transaction[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [data, setData] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      await delay(500);

      const response = await transactionsAPI.getTransactions();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
