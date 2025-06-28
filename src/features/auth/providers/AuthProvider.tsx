import { ReactNode, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string>();
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAccessTokenState(token);

    const decoded = jwtDecode<{ username: string }>(token);
    if (decoded.username) setLoggedInUser(decoded.username);
  };

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
    setAccessTokenState(undefined);
    setLoggedInUser(undefined);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setAccessToken(token);
    setIsReady(true);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, removeAccessToken, loggedInUser }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
}
