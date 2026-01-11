import { TGame } from '../../../../../game-dev-shared/src/game';
import './styles/gameposts.scss';

type TGamePostsProps = {
  game: TGame;
};

export default function GamePosts({ game }: TGamePostsProps) {
  return (
    <div>
      {game.game_id}
      Posts page.
    </div>
  );
}
