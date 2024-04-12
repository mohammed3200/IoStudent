import {useState, useEffect} from 'react';
import {API_URL, useAuth} from '@/context/AuthContext';
import axios from 'axios';
import {useRouter} from 'expo-router';

export const useFetch = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});
  const {onLogout} = useAuth();
  const router = useRouter();

  const fetchData = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setData(response.data.data);
    } catch (error: any) {
      if (
        error.message.statusCode === 401
      ) {
        onLogout;
        setError(error.message);
        router.replace('/logoIn');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${API_URL}${endpoint}`);
  }, [endpoint]);

  const refetch = () => {
    setIsLoading(true);
    fetchData(`${API_URL}${endpoint}`);
  };

  return {data, isLoading, error, refetch};
};
