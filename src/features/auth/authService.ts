import axios from 'axios';
import { apiUrl } from '../../app/config';

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post<string>(`${apiUrl}/auth/login`, 
  {
    username,
    password
  },
  {
    withCredentials: true
  });

  return response.data;
};

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await axios.post<string>(`${apiUrl}/auth/register`, 
  {
    username,
    email,
    password
  },
  {
    withCredentials: true
  });

  return response.data;
};
