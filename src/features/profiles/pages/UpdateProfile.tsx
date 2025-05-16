import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfileByUsername, updateProfile } from '../profilesService';
import { profileSchema, TProfileSchema, TProfile } from '../../../../../game-dev-shared/src/profile';
import useServer from '../../../hooks/useServer';
import useAxios from '../../../hooks/useAxios';
import useAuthContext from '../../auth/hooks/useAuth';
import Button from '../../../components/Button';
import './styles/updateprofile.scss';

export default function UpdateProfile() {
  const { loggedInUser } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const { execute } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema)
  });

  const params = useMemo(() => [loggedInUser], [loggedInUser]);
  const profile: TProfile | undefined = useServer(getProfileByUsername, params);
  if (profile) {
    setValue('bio', profile.bio);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const bio = data.bio;

      const username: string = await execute(updateProfile, [bio]);
      return navigate(`/profile/${username}`);
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="updateprofile-container">
      <form onSubmit={handleSubmit(onSubmit)} className="updateprofile-content">
        <div className="updateprofile-title">Update Profile</div>
        <div>
          <textarea {...register('bio')} placeholder="Bio" rows={8} className="updateprofile-textarea" />
          {errors.bio && <div className="updateprofile-error">{errors.bio.message}</div>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
