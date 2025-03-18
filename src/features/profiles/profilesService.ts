import axios from 'axios';
import { apiUrl } from '../../app/config';
import { TProfile } from '../../../../game-dev-shared/src/profile';

export const getProfileById = async (id: string | undefined) => {
  const response = await axios.get<TProfile>(`${apiUrl}/api/profiles/${id}`);
  return response.data;
};

export const updateProfile = async (bio: string) => {
  const response = await axios.put<TProfile>(
    `${apiUrl}/api/profiles`,
    {
      bio
    },
    {
      withCredentials: true
    }
  );

  return response.data;
};
