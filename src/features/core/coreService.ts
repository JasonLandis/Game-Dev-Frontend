import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TGame } from '@jlandis1/gamedevblog-shared';

export const getGames = async () => {
  const response = await axios.get<TGame[]>(`${apiUrl}/api/games`);
  return response.data;
};
