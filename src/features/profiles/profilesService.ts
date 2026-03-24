import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TProfile } from '@jlandis1/gamedevblog-shared';

export const getProfileByUsername = async (username: string | undefined) => {
  const response = await axios.get<TProfile>(`${apiUrl}/api/profiles/${username}`);
  return response.data;
};
