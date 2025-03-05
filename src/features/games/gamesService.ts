import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TGame } from '../../../../game-dev-shared/src/games';

export const getGameById = async (id: string | undefined) => {
  const response = await axios.get<TGame>(`${apiUrl}/api/games/${id}`);
  return response.data;
};
