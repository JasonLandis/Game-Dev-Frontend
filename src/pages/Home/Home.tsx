import { useState, useEffect } from 'react';
import { IGameFull } from '../../../../game-dev-shared/src/games';
import './Home.scss';
import { Link } from 'react-router-dom';
import Error from '../../components/Error/Error';

export default function Home() {
  const [games, setGames] = useState<IGameFull[] | null>(null);
  const [error, setError] = useState<{ message: string; status: number }>();

  useEffect(() => {
    fetch('http://localhost:4000/api/games')
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        setError({
          message: await response.json(),
          status: response.status
        });
      })
      .then((json: IGameFull[]) => {
        setGames(json);
      });
  }, []);

  return (
    <>
      <div className="global-page-container">
        {games ? (
          <div className="home-grid-container">
            {games.map((game) => (
              <Link to={`/game/${game.game_id}`} key={game.game_id} className="home-card">
                <div className="home-card-content">
                  <div className="home-card-title">
                    <strong>{game.name}</strong>
                  </div>
                  <div className="home-card-property">
                    <strong>Description:</strong> {game.description}
                  </div>
                  <div className="home-card-property">
                    <strong>Developer:</strong> {game.developer}
                  </div>
                  <div className="home-card-property">
                    <strong>Release Date:</strong> {game.release_date ?? 'Undetermined'}
                  </div>
                  <div>
                    <strong>Price:</strong> {game.price ? `$${game.price.toFixed(2)}` : 'Undetermined'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : error ? (
          <Error error={error} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
