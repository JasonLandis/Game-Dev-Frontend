import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServer from '../../../lib/hooks/useServer';
import { getGameById } from '../gamesService';
import { TGame } from '../../../../../game-dev-shared/src/games';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import GameAbout from '../components/GameAbout';
import GamePosts from '../components/GamePosts';
import GamePolls from '../components/GamePolls';
import GameDiscussions from '../components/GameDiscussions';
import './styles/game.scss';

export default function Game() {
  const { id } = useParams();

  const [tab, setTab] = useState<'about' | 'posts' | 'polls' | 'discussions'>('about');
  const params = useMemo(() => [id], [id]);
  const game: TGame | undefined = useServer(getGameById, params);

  const changeView = (tabName: 'about' | 'posts' | 'polls' | 'discussions') => {
    setTab(tabName);
  }

  return (
    <>
      {game ? (
        <>
          <div className="game-title">
            <strong>{game.name}</strong>
          </div>
          <div className="game-button">
            <Link to={`/updategame/${id}`}>
              <Button>Update</Button>
            </Link>
          </div>
          <div className="game-nav-container">
            <Button clickEvent={() => changeView('about')} selected={tab === 'about'}>About</Button>
            <Button clickEvent={() => changeView('posts')} selected={tab === 'posts'}>Posts</Button>
            <Button clickEvent={() => changeView('polls')} selected={tab === 'polls'}>Polls</Button>
            <Button clickEvent={() => changeView('discussions')} selected={tab === 'discussions'}>Discussions</Button>
          </div>
          <div className='game-component-container'>
            { tab === 'about' && <GameAbout game={game} /> }
            { tab === 'posts' && <GamePosts game={game} /> }
            { tab === 'polls' && <GamePolls game={game} /> }
            { tab === 'discussions' && <GameDiscussions game={game} /> }
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
