import {useState, useEffect} from 'react';
import {userAPI, delay} from '../services/api';

interface UserData {
  id: number;
  name: string;
  availableBalance: number;
  currency: string;
}

interface UseUserDataReturn {
  data: UserData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUserData = (): UseUserDataReturn => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      await delay(500);

      const response = await userAPI.getUser();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user data');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
