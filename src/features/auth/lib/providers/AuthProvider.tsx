import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      const decoded = jwtDecode<{ username: string }>(token);
      if (decoded.username) {
        setUsername(decoded.username);
      }
    }
    setIsReady(true);
  }, [accessToken]);

  return <AuthContext.Provider value={{ accessToken, setAccessToken, username }}>{isReady ? children : null}</AuthContext.Provider>;
};
