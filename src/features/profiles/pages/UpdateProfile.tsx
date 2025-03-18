import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useServer from '../../../lib/hooks/useServer';
import Button from '../../../components/Button';
import { getProfileById, updateProfile } from '../profilesService';
import { profileSchema, TProfileSchema, TProfile } from '../../../../../game-dev-shared/src/profile';
import './styles/updateprofile.scss';

export default function UpdateProfile() {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema)
  });

  const params = useMemo(() => [id], [id]);
  const profile: TProfile | undefined = useServer(getProfileById, params);
  if (profile) {
    setValue('bio', profile.bio);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const bio = data.bio;

      const userId = await updateProfile(bio);
      return navigate(`/profile/${userId}`);
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="updateprofile-container">
      <form onSubmit={handleSubmit(onSubmit)} className="updateprofile-content">
        <div className="updateprofile-title">Update Profile</div>
        <div>
          <textarea {...register('bio')} placeholder="Description" rows={8} className="updateprofile-textarea" />
          {errors.bio && <div className="updateprofile-error">{errors.bio.message}</div>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
