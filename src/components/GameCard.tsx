import { Link } from 'react-router-dom';
import { TGame } from '@jlandis1/gamedevblog-shared';
import './styles/gamecard.scss';

type TGameProps = {
  game: TGame;
};

export default function GameCard({ game }: TGameProps) {
  return (
    <Link to={`/game/${game.game_id}`} className="gamecard">
      <div className="gamecard-content">
        <div className="gamecard-title">
          <strong>{game.name}</strong>
        </div>
        <div className="gamecard-properties">
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
