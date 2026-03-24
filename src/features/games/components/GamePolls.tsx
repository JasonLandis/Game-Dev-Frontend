import { TGame } from '@jlandis1/gamedevblog-shared';
import './styles/gamepolls.scss';

type TGamePollsProps = {
  game: TGame;
};

export default function GamePolls({ game }: TGamePollsProps) {
  return (
    <div>
      {game.game_id}
      Polls page.
    </div>
  );
}
