import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useServer from '../../../lib/hooks/useServer';
import { getProfileById } from '../profilesService';
import Button from '../../../components/Button';
import useAuthContext from '../../auth/lib/hooks/useAuth';
import { TProfile } from '../../../../../game-dev-shared/src/profiles';
import './styles/profile.scss';
import GameCard from '../../../components/GameCard';
import Loader from '../../../components/Loader';

export default function Profile() {
  const { id } = useParams();
  const { userId, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const params = useMemo(() => [id], [id]);
  const profile: TProfile | undefined = useServer(getProfileById, params);

  const logout = async () => {
    localStorage.removeItem('accessToken');
    setAccessToken(undefined);
    return navigate(`/`);
  };

  return (
    <>
      {profile ? (
        <>
          <div className="profile-username">{profile.username}</div>
          <div className="profile-bio">{profile.bio}</div>
          {userId == profile.user_id && (
            <>
              <Link to={`/updateprofile/${id}`} className="profile-update">
                <Button>Update</Button>
              </Link>
              <Button clickEvent={logout}>Logout</Button>
            </>
          )}
          <div className="profile-games">Games</div>
          <div className="profile-grid-container">
            {profile.games.map((game) => (
              <GameCard key={game.game_id} game={game} />
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
