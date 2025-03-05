import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, [accessToken]);

  return <AuthContext.Provider value={{ accessToken, setAccessToken }}>{isReady ? children : null}</AuthContext.Provider>;
};

export default AuthProvider;
