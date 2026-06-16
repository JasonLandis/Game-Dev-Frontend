import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TGame, TPoll } from '@jlandis1/gamedevblog-shared';
import useServer from '../../../hooks/useServer';
import { getPollsByGameId } from '../gamesService';
import Loader from '../../../components/Loader';
import './styles/gamepolls.scss';

type TGamePollsProps = {
  game: TGame;
};

export default function GamePolls({ game }: TGamePollsProps) {
  const deps = useMemo(() => [game.game_id.toString()], [game.game_id]);
  const polls: TPoll[] | undefined = useServer<TPoll[], string>(getPollsByGameId, deps);

  const dict = new Map<number, number>();

  if (polls) {
    for (const poll of polls) {
      for (const option of poll.options) {
        const total = dict.get(poll.poll_id) ?? 0;
        dict.set(poll.poll_id, total + option.votes.length);
      }
    }
  }

  const [expandedPolls, setExpandedPolls] = useState<Set<number>>(new Set());

  function toggleComments(pollId: number) {
    setExpandedPolls((prev) => {
      const updated = new Set(prev);

      if (updated.has(pollId)) {
        updated.delete(pollId);
      } else {
        updated.add(pollId);
      }

      return updated;
    });
  }

  return (
    <>
      {polls ? (
        <div>
          {polls.map((poll) => {
            const showComments = expandedPolls.has(poll.poll_id);

            return (
              <div key={poll.poll_id} className="gamepolls-poll-container">
                <div className="gamepolls-poll-content">{poll.question}</div>
                <div className="gamepolls-poll-options-container">
                  {poll.options.map((option) => {
                    const percentage = dict.get(poll.poll_id) ? (option.votes.length * 100) / dict.get(poll.poll_id)! : 0;

                    return (
                      <div key={option.option_id} className="gamepolls-poll-options">
                        <div className="gamepolls-poll-options-fill" style={{ width: `${percentage}%` }} />

                        <div className="gamepolls-poll-options-content">
                          <div>{option.answer}</div>
                          <div className="gamepolls-poll-options-stats">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="gamepolls-poll-line"></div>
                <div className="gamepolls-poll-date">
                  {new Intl.DateTimeFormat('en-us', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  }).format(new Date(poll.created_at))}
                </div>
                <button className="gamepolls-poll-comment-button" onClick={() => toggleComments(poll.poll_id)}>
                  {showComments ? 'hide comments' : 'show comments'}
                </button>

                {showComments &&
                  poll.comments.map((comment) => (
                    <div key={comment.comment_id} className="gamepolls-poll-comment-container">
                      <div className="gamepolls-poll-comment-header">
                        <Link to={`/profile/${comment.username}`}>
                          <div className="gamepolls-comment-profile">
                            <img src={`http://localhost:4000/assets/user.png`} />
                            {comment.username}
                          </div>
                        </Link>
                        <div className="gamepolls-poll-comment-date">
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
