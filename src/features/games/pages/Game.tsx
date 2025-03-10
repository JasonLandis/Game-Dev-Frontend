import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServer from '../../../lib/hooks/useServer';
import { getGameById } from '../gamesService';
import { TGame } from '../../../../../game-dev-shared/src/games';
import './styles/game.scss';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

export default function Game() {
  const { id } = useParams();

  const params = useMemo(() => [id], [id]);
  const game: TGame | undefined = useServer(getGameById, params);

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
              <Link to={`/updategame/${id}`}>
                <Button>Update</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
