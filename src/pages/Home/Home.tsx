import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TGame } from '../../../../game-dev-shared/src/games';
import APIError from '../../components/APIError/APIError';
import './Home.scss';

export default function Home() {
  const { showBoundary } = useErrorBoundary();

  const [games, setGames] = useState<TGame[]>();
  const [error, setError] = useState<AxiosResponse>();

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get<TGame[]>('http://localhost:4000/api/games');
        const games = response.data;
        return setGames(games);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          return setError(error.response);
        }

        showBoundary(error);
      }
    };

    getGames();
  }, [showBoundary]);

  return (
    <div className="global-page-container">
      {games ? (
        <div className="home-grid-container">
          {games.map((game) => (
            <Link to={`/game/${game.game_id}`} key={game.game_id} className="home-card">
              <div className="home-card-content">
                <div className="home-card-title">
                  <strong>{game.name}</strong>
                </div>
                <div className="home-card-properties">
                  <div>
                    <strong>Description: </strong>
                    {game.description}
                  </div>
                  <div>
                    <strong>Developer: </strong>
                    {game.developer}
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
                    <strong>Price: </strong>
                    {game.price ? `$${game.price.toFixed(2)}` : 'Undetermined'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : error ? (
        <APIError error={error} />
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
    </div>
  );
}
