import { TGame } from '../../../../../game-dev-shared/src/game';
import './styles/gamediscussions.scss';

type TGameDiscussionsProps = {
    game: TGame
}

export default function GameDiscussions({ game }: TGameDiscussionsProps) {
  return (
    <div>
      { game.game_id }
      Discussions page.
    </div>
  );
}
