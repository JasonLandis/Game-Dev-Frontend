import { TGame, TPost } from '@jlandis1/gamedevblog-shared';
import useServer from '../../../hooks/useServer';
import { getPostsByGameId } from '../gamesService';
import Loader from '../../../components/Loader';
import './styles/gameposts.scss';

type TGamePostsProps = {
  game: TGame;
};

export default function GamePosts({ game }: TGamePostsProps) {
  const posts: TPost[] | undefined = useServer<TPost[], string>(getPostsByGameId, [game.game_id.toString()]);

  return (
    <>
      {posts ? (
        <div>
          {posts.map((post) => (
            <>
              <div key={post.post_id} className="gameposts-post-container">
                <div className="gameposts-post-content">{post.content}</div>
                <div className="gameposts-post-line"></div>
                <div className="gameposts-post-date">
                  {new Intl.DateTimeFormat('en-us', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  }).format(new Date(post.created_at))}
                </div>
                <div className="gameposts-post-comment">load comments</div>
              </div>
              {post.comments.map((comment) => (
                <>
                  <div key={comment.comment_id}>
                    <div>{comment.content}</div>
                  </div>
                </>
              ))}
            </>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
