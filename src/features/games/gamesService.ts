import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TGame } from '../../../../game-dev-shared/src/game';

export const getGameById = async (id: string | undefined) => {
  const response = await axios.get<TGame>(`${apiUrl}/api/games/${id}`);
  return response.data;
};

export const createGame = async (name: string, description: string, release_date: string, price: number) => {
  const response = await axios.post<number>(
    `${apiUrl}/api/games`,
    {
      name,
      description,
      release_date,
      price
    }
  );

  return response.data;
};

export const updateGame = async (id: string, name: string, description: string, release_date: string, price: number) => {
  const response = await axios.put<number>(
    `${apiUrl}/api/games/${id}`,
    {
      name,
      description,
      release_date,
      price
    }
  );

  return response.data;
};

export const deleteGame = async (id: string) => {
  await axios.delete<boolean>(`${apiUrl}/api/games/${id}`);
};
