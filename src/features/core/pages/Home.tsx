import { useMemo } from 'react';
import GameCard from '../../../components/GameCard';
import useServer from '../../../hooks/useServer';
import { getGames } from '../coreService';
import { TGame } from '../../../../../game-dev-shared/src/game';
import Loader from '../../../components/Loader';
import './styles/home.scss';

export default function Home() {
  const params = useMemo(() => [], []);
  const data: TGame[] | undefined = useServer<TGame[], never[]>(getGames, params);

  return (
    <>
      {data ? (
        <div className="home-grid-container">
          {data.map((game) => (
            <GameCard key={game.game_id} game={game} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
