import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getProfileByUsername } from '../profilesService';
import { logoutUser } from '../../auth/authService';
import { TProfile } from '../../../../../game-dev-shared/src/profile';
import useServer from '../../../lib/hooks/useServer';
import useAuthContext from '../../auth/lib/hooks/useAuth';
import Button from '../../../components/Button';
import GameCard from '../../../components/GameCard';
import Loader from '../../../components/Loader';
import './styles/profile.scss';

export default function Profile() {
  const { username } = useParams();
  const { loggedInUser, setAccessToken } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const params = useMemo(() => [username], [username]);
  const profile: TProfile | undefined = useServer(getProfileByUsername, params);

  const logout = async () => {
    try {
      localStorage.removeItem('accessToken');
      await logoutUser();
      setAccessToken(undefined);
      return navigate(`/`);
    } catch(error) {
      showBoundary(error);
    }
  };

  return (
    <>
      {profile ? (
        <>
          <div className="profile-username">{profile.username}</div>
          <div className="profile-bio">{profile.bio}</div>
          {loggedInUser === profile.username && (
            <>
              <Link to="/updateprofile" className="profile-update">
                <Button>Update</Button>
              </Link>
              <Button clickEvent={logout}>Logout</Button>
            </>
          )}
          <div className="profile-games-title">Games</div>
          <div className="profile-games-grid-container">
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
