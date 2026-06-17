import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TGame, TPost } from '@jlandis1/gamedevblog-shared';
import useServer from '../../../hooks/useServer';
import { getPostsByGameId } from '../gamesService';
import Loader from '../../../components/Loader';
import { apiUrl } from '../../../app/config';
import './styles/gameposts.scss';

type TGamePostsProps = {
  game: TGame;
};

export default function GamePosts({ game }: TGamePostsProps) {
  const deps = useMemo(() => [game.game_id.toString()], [game.game_id]);
  const posts: TPost[] | undefined = useServer<TPost[], string>(getPostsByGameId, deps);

  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  function toggleComments(postId: number) {
    setExpandedPosts((prev) => {
      const updated = new Set(prev);

      if (updated.has(postId)) {
        updated.delete(postId);
      } else {
        updated.add(postId);
      }

      return updated;
    });
  }

  return (
    <>
      {posts ? (
        <div>
          {posts.map((post) => {
            const showComments = expandedPosts.has(post.post_id);

            return (
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
                <button className="gameposts-post-comment-button" onClick={() => toggleComments(post.post_id)}>
                  {showComments ? 'hide comments' : 'show comments'}
                </button>

                {showComments &&
                  post.comments.map((comment) => (
                    <div key={comment.comment_id} className="gameposts-post-comment-container">
                      <div className="gameposts-post-comment-header">
                        <Link to={`/profile/${comment.username}`}>
                          <div className="gameposts-comment-profile">
                            <img src={`${apiUrl}/assets/user.png`} />
                            {comment.username}
                          </div>
                        </Link>
                        <div className="gameposts-post-comment-date">
                          {new Intl.DateTimeFormat('en-us', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                          }).format(new Date(comment.created_at))}
                        </div>
                      </div>
                      <div>{comment.content}</div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
