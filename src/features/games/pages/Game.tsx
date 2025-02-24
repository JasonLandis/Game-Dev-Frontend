import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getGameById } from '../gamesService';
import { TGame } from '../../../../../game-dev-shared/src/games';
import '../games.scss';

export default function Game() {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();

  const [game, setGame] = useState<TGame>();

  useEffect(() => {
    (async () => {
      try {
        const game: TGame = await getGameById(id);
        setGame(game);
      } catch (error) {
        showBoundary(error);
      }
    })();
  }, [id, showBoundary]);

  return (
    <>
      {game ? (
        <>
          <div className="game-title">
            <strong>{game.name}</strong>
          </div>
          <div className="game-properties">
            <div>
              <strong>Description:</strong> {game.description}
            </div>
            <div>
              <strong>Developer:</strong> {game.developer}
            </div>
            <div>
              <strong>Release Date: </strong>
              {game.release_date
                ? new Intl.DateTimeFormat('en-us', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  }).format(new Date(game.release_date))
                : 'Undetermined'}
            </div>
            <div>
              <strong>Price:</strong> {game.price ? `$${game.price}` : 'Undetermined'}
            </div>
            <div>
              <Link to={`/update/${id}`}>
                <button>Update</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
