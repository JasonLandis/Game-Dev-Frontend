import { TGame } from '@jlandis1/gamedevblog-shared';
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
