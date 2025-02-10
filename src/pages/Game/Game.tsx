import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import axios, { AxiosError, AxiosResponse } from 'axios';
import APIError from '../../components/APIError/APIError';
import { TGame } from '../../../../game-dev-shared/src/games';
import './Game.scss';

export default function Game() {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();

  const [game, setGame] = useState<TGame>();
  const [error, setError] = useState<AxiosResponse>();

  useEffect(() => {
    const getGameById = async () => {
      try {
        const response = await axios.get<TGame>(`http://localhost:4000/api/games/${id}`);
        const game = response.data;
        return setGame(game);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          return setError(error.response);
        }

        showBoundary(error);
      }
    };

    getGameById();
  }, [showBoundary, id]);

  return (
    <div className="global-page-container">
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
              <strong>Price:</strong> {game.price ? `$${game.price.toFixed(2)}` : 'Undetermined'}
            </div>
          </div>
        </>
      ) : error ? (
        <APIError error={error} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
