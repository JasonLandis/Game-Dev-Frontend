import { useState, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import GameCard from '../../../components/GameCard';
import { getGames } from '../coreService';
import { TGame } from '../../../../../game-dev-shared/src/games';
import '../core.scss';

export default function Home() {
  const { showBoundary } = useErrorBoundary();

  const [games, setGames] = useState<TGame[]>();

  useEffect(() => {
    (async () => {
      try {
        const games: TGame[] = await getGames();
        setGames(games);
      } catch (error) {
        showBoundary(error);
      }
    })();
  }, [showBoundary]);

  return (
    <>
      {games ? (
        <div className="home-grid-container">
          {games.map((game) => (
            <GameCard key={game.game_id} game={game} />
          ))}
        </div>
      ) : (
        <div className="home-grid-container home-loading-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
}
