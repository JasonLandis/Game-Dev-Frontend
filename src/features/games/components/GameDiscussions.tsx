import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TGame, TDiscussion } from '@jlandis1/gamedevblog-shared';
import useServer from '../../../hooks/useServer';
import { getDiscussionsByGameId } from '../gamesService';
import Loader from '../../../components/Loader';
import './styles/gamediscussions.scss';

type TGameDiscussionsProps = {
  game: TGame;
};

export default function GameDiscussions({ game }: TGameDiscussionsProps) {
  const deps = useMemo(() => [game.game_id.toString()], [game.game_id]);
  const discussions: TDiscussion[] | undefined = useServer<TDiscussion[], string>(getDiscussionsByGameId, deps);

  const [activeTopic, setActiveTopic] = useState<number | null>(null);

  useEffect(() => {
    if (discussions && discussions.length > 0 && activeTopic === null) {
      setActiveTopic(discussions[0].discussion_id);
    }
  }, [discussions, activeTopic]);

  const selectedDiscussion = discussions?.find((discussion) => discussion.discussion_id === activeTopic);

  return (
    <>
      {discussions ? (
        <>
          <div className="gamediscussion-grid-container">
            {discussions.map((discussion) => (
              <div
                key={discussion.discussion_id}
                className={
                  discussion.discussion_id === activeTopic
                    ? 'gamediscussion-discussion-topic active-topic'
                    : 'gamediscussion-discussion-topic'
                }
                onClick={() => setActiveTopic(discussion.discussion_id)}
              >
                {discussion.topic}
              </div>
            ))}
          </div>
          <div className="gamediscussion-comments-container">
            {selectedDiscussion?.comments.map((comment) => (
              <div key={comment.comment_id} className="gamediscussion-discussion-comment-container">
                <div className="gamediscussion-discussion-comment-header">
                  <Link to={`/profile/${comment.username}`}>
                    <div className="gamediscussion-comment-profile">
                      <img src="http://localhost:4000/assets/user.png" />
                      {comment.username}
                    </div>
                  </Link>

                  <div className="gamediscussion-discussion-comment-date">
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
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
