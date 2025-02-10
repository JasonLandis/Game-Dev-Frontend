import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type UserContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: () => boolean;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const isLoggedIn = () => {
    return !!accessToken;
  };

  return <AuthContext.Provider value={{ accessToken, setAccessToken, isLoggedIn }}>{isReady ? children : null}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
