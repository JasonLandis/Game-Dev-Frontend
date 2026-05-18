import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileByUsername } from '../profilesService';
import { TProfile } from '@jlandis1/gamedevblog-shared';
import useServer from '../../../hooks/useServer';
import GameCard from '../../../components/GameCard';
import Loader from '../../../components/Loader';
import './styles/profile.scss';

export default function Profile() {
  const { username } = useParams();

  const params = useMemo(() => [username], [username]);
  const profile: TProfile | undefined = useServer(getProfileByUsername, params);

  return (
    <>
      {profile ? (
        <>
          <div className="profile-username">{profile.username}</div>
          <div className="profile-bio">{profile.bio}</div>
          {profile.games.length > 0 && (
            <>
              <div className="profile-games-title">Games</div>
              <div className="profile-games-grid-container">
                {profile.games.map((game) => (
                  <GameCard key={game.game_id} game={game} profile={true} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
