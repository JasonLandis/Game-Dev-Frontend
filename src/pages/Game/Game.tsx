import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IGameFull } from '../../../../game-dev-shared/src/games';
import Error from '../../components/Error/Error';
import './Game.scss';

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState<IGameFull | null>(null);
  const [error, setError] = useState<{ message: string; status: number }>();

  useEffect(() => {
    fetch(`http://localhost:4000/api/games/${id}`)
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        setError({
          message: await response.json(),
          status: response.status
        });
      })
      .then((json: IGameFull) => {
        setGame(json);
      });
  }, [id]);

  return (
    <>
      <div className="global-page-container">
        {game ? (
          <>
            <div className="game-title">
              <strong>{game.name}</strong>
            </div>
            <div className="game-property">
              <strong>Description:</strong> {game.description}
            </div>
            <div className="game-property">
              <strong>Developer:</strong> {game.developer}
            </div>
            <div className="game-property">
              <strong>Release Date:</strong> {game.release_date ?? 'Undetermined'}
            </div>
            <div className="game-property">
              <strong>Price:</strong> {game.price ? `$${game.price.toFixed(2)}` : 'Undetermined'}
            </div>
          </>
        ) : error ? (
          <Error error={error} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
