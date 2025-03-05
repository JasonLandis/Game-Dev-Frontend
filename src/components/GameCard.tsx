import { Link } from 'react-router-dom';
import { TGame } from '../../../game-dev-shared/src/games';
import './styles/gamecard.scss';

type TGameProps = {
  game: TGame
}

export default function GameCard({ game }: TGameProps) {
  return (
    <Link to={`/game/${game.game_id}`} className="game-card">
      <div className="game-card-content">
        <div className="game-card-title">
          <strong>{game.name}</strong>
        </div>
        <div className="game-card-properties">
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
            {game.price ? `$${game.price}` : 'Undetermined'}
          </div>
        </div>
      </div>
    </Link>
  );
}
