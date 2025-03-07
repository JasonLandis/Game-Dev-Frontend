import GameCard from '../../../components/GameCard';
import useServer from '../../../lib/hooks/useServer';
import { getGames } from '../coreService';
import { TGame } from '../../../../../game-dev-shared/src/games';
import './styles/home.scss';

export default function Home() {
  const data: TGame[] = useServer(getGames);

  return (
    <>
      {data ? (
        <div className="home-grid-container">
          {data.map((game) => (
            <GameCard key={game.game_id} game={game} />
          ))}
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
