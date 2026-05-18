import { Link } from 'react-router-dom';
import { TGame } from '@jlandis1/gamedevblog-shared';
import './styles/gameabout.scss';

type TGameAboutProps = {
  game: TGame;
};

export default function GameAbout({ game }: TGameAboutProps) {
  let fileName = game.name;
  if (fileName === 'Spider-Man: The Game') {
    fileName = 'Spider-Man The Game';
  }

  return (
    <div className="gameabout-container">
      <img src={`http://localhost:4000/assets/games/${fileName}.png`} />
      <div className="gameabout-properties">
        <div className="gameabout-description">{game.description}</div>
        <div>
          <Link to={`/profile/${game.developer}`}>
            <div className="gameabout-subheader">Developer</div>
            <div>{game.developer}</div>
          </Link>
        </div>
        <div>
          <div className="gameabout-subheader">Release Date</div>
          <div>
            {game.release_date
              ? new Intl.DateTimeFormat('en-us', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }).format(new Date(game.release_date))
              : 'Undetermined'}
          </div>
        </div>
        <div>
          <div className="gameabout-subheader">Price</div>
          <div>{game.price ? `$${game.price}` : 'Undetermined'}</div>
        </div>
      </div>
    </div>
  );
}
