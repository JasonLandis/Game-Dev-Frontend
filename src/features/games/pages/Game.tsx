import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useServer from '../../../hooks/useServer';
import { getGameById } from '../gamesService';
import { TGame } from '@jlandis1/gamedevblog-shared';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import GameAbout from '../components/GameAbout';
import GamePosts from '../components/GamePosts';
import GamePolls from '../components/GamePolls';
import GameDiscussions from '../components/GameDiscussions';
import './styles/game.scss';

export default function Game() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const validTabs = ['about', 'posts', 'polls', 'discussions'] as const;
  type Tab = (typeof validTabs)[number];

  const tabParam = searchParams.get('tab');

  const tab: Tab = validTabs.includes(tabParam as Tab) ? (tabParam as Tab) : 'about';

  const params = useMemo(() => [id], [id]);
  const game: TGame | undefined = useServer(getGameById, params);

  const changeView = (tabName: Tab) => {
    setSearchParams({ tab: tabName });
  };

  return (
    <>
      {game ? (
        <>
          <div className="game-title">
            <strong>{game.name}</strong>
          </div>
          <div className="game-nav-container">
            <Button clickEvent={() => changeView('about')} active={tab === 'about'}>
              About
            </Button>
            <Button clickEvent={() => changeView('posts')} active={tab === 'posts'}>
              Posts
            </Button>
            <Button clickEvent={() => changeView('polls')} active={tab === 'polls'}>
              Polls
            </Button>
            <Button clickEvent={() => changeView('discussions')} active={tab === 'discussions'}>
              Discussions
            </Button>
          </div>
          <div className="game-component-container">
            {tab === 'about' && <GameAbout game={game} />}
            {tab === 'posts' && <GamePosts game={game} />}
            {tab === 'polls' && <GamePolls game={game} />}
            {tab === 'discussions' && <GameDiscussions game={game} />}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
