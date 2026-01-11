import { useAuthContext } from '../features/auth/auth';
import { apiUrl } from '../app/config';
import axios from 'axios';

export default function useAxios() {
  const { setAccessToken } = useAuthContext();

  const execute = async <T, P extends unknown[]>(serviceFunction: (...params: P) => Promise<T>, params: P): Promise<T> => {
    try {
      const response: T = await serviceFunction(...params);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const refreshResponse = await axios.post<string>(`${apiUrl}/auth/refresh`, {}, { withCredentials: true });

        const newAccessToken = refreshResponse.data;
        localStorage.setItem('accessToken', newAccessToken);
        setAccessToken(newAccessToken);

        const retryResponse: T = await serviceFunction(...params);
        return retryResponse;
      } else {
        throw error;
      }
    }
  };

  return { execute };
}
