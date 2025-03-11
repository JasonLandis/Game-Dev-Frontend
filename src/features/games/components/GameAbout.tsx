import { TGame } from '../../../../../game-dev-shared/src/games';
import './styles/gameabout.scss';

type TGameAboutProps = {
    game: TGame
}

export default function GameAbout({ game }: TGameAboutProps) {
  return (
    <div className="gameabout-properties">
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
    </div>
  );
}
