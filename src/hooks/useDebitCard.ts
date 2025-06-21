import {useState, useEffect} from 'react';
import {debitCardAPI, delay} from '../services/api';

interface DebitCardData {
  id: number;
  userId: number;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  isActive: boolean;
  cardType: string;
}

interface UseDebitCardReturn {
  data: DebitCardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDebitCard = (): UseDebitCardReturn => {
  const [data, setData] = useState<DebitCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCardData = async () => {
    try {
      setLoading(true);
      setError(null);

      await delay(500);

      const response = await debitCardAPI.getCard();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch card data');
      console.error('Error fetching card data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchCardData();
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
