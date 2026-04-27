import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TGame, TPost, TPoll, TDiscussion, TComment } from '@jlandis1/gamedevblog-shared';

export const getGameById = async (id: string | undefined) => {
  const response = await axios.get<TGame>(`${apiUrl}/api/games/${id}`);
  return response.data;
};

export const getPostsByGameId = async (id: string) => {
  const response = await axios.get<TPost[]>(`${apiUrl}/api/games/${id}/posts`);
  return response.data;
};

export const getPollsByGameId = async (id: string) => {
  const response = await axios.get<TPoll[]>(`${apiUrl}/api/games/${id}/polls`);
  return response.data;
};

export const getDiscussionsByGameId = async (id: string) => {
  const response = await axios.get<TDiscussion[]>(`${apiUrl}/api/games/${id}/discussions`);
  return response.data;
};

export const getCommentsByGameAndEntityId = async (game_id: string, entity_type: string, entity_id: string) => {
  const response = await axios.get<TComment[]>(`${apiUrl}/api/games/${game_id}/${entity_type}/${entity_id}`);
  return response.data;
};
