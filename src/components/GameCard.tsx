import { Link } from 'react-router-dom';
import { TGame } from '@jlandis1/gamedevblog-shared';
import './styles/gamecard.scss';

type TGameProps = {
  game: TGame;
  profile?: boolean;
};

export default function GameCard({ game, profile }: TGameProps) {
  let fileName = game.name;
  if (fileName === 'Spider-Man: The Game') {
    fileName = 'Spider-Man The Game';
  }

  return (
    <div className="gamecard">
      <Link to={`/game/${game.game_id}`}>
        <div className="gamecard-content">
          <div className="gamecard-title">
            <strong>{game.name}</strong>
          </div>
          <img className="gamecard-graphic" src={`http://localhost:4000/assets/games/${fileName}.png`} />
          <div className="gamecard-description">{game.description}</div>
        </div>
      </Link>
      {!profile && (
        <Link to={`/profile/${game.developer}`}>
          <div className="gamecard-profile">
            <img src={`http://localhost:4000/assets/user.png`} />
            {game.developer}
          </div>
        </Link>
      )}
    </div>
  );
}
