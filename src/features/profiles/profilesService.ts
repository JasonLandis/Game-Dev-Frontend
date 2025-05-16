import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TProfile } from '../../../../game-dev-shared/src/profile';

export const getProfileByUsername = async (username: string | undefined) => {
  const response = await axios.get<TProfile>(`${apiUrl}/api/profiles/${username}`);
  return response.data;
};

export const updateProfile = async (bio: string) => {
  const response = await axios.put<string>(
    `${apiUrl}/api/profiles`,
    {
      bio
    }
  );

  return response.data;
};
