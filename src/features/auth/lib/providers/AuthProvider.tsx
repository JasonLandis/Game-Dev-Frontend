import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      const decoded = jwtDecode<{ user_id: string }>(token);
      if (decoded.user_id) {
        setUserId(decoded.user_id);
      }
    }
    setIsReady(true);
  }, [accessToken]);

  return <AuthContext.Provider value={{ accessToken, setAccessToken, userId }}>{isReady ? children : null}</AuthContext.Provider>;
};

export default AuthProvider;
