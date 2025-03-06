import { useState } from 'react';
import GameCard from '../../../components/GameCard';
import useServer from '../../../lib/hooks/useServer';
import { getGames } from '../coreService';
import { TGame } from '../../../../../game-dev-shared/src/games';
import './styles/home.scss';

export default function Home() {
  const [games, setGames] = useState<TGame[]>();
  const data: TGame[] = useServer(getGames);
  setGames(data);

  return (
    <>
      {games ? (
        <div className="home-grid-container">
          {games.map((game) => (
            <GameCard key={game.game_id} game={game} />
          ))}
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
