import { TGame } from '@jlandis1/gamedevblog-shared';
import './styles/gamediscussions.scss';

type TGameDiscussionsProps = {
  game: TGame;
};

export default function GameDiscussions({ game }: TGameDiscussionsProps) {
  return (
    <div>
      {game.game_id}
      Discussions page.
    </div>
  );
}
