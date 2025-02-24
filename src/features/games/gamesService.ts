import axios from 'axios';
import { TGame } from '../../../../game-dev-shared/src/games';

const apiEndpoint = 'http://localhost:4000';

export const getGameById = async (id: string | undefined) => {
  const response = await axios.get<TGame>(`${apiEndpoint}/api/games/${id}`);
  return response.data;
};
