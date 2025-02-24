import { Link } from 'react-router-dom';
import { TGame } from '../../../game-dev-shared/src/games';
import '../app/global.scss';

type TGameCardProps = {
  game: TGame;
};

export default function GameCard({ game }: TGameCardProps) {
  return (
    <Link to={`/game/${game.game_id}`} className="global-game-card">
      <div className="global-game-card-content">
        <div className="global-game-card-title">
          <strong>{game.name}</strong>
        </div>
        <div className="global-game-card-properties">
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
