import { TGame } from '../../../../../game-dev-shared/src/game';
import './styles/gamepolls.scss';

type TGamePollsProps = {
    game: TGame
}

export default function GamePolls({ game }: TGamePollsProps) {
  return (
    <div>
      { game.game_id }
      Polls page.
    </div>
  );
}
