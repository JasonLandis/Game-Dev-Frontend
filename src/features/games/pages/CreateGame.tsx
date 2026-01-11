import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAxios from '../../../hooks/useAxios';
import { createGame } from '../gamesService';
import Button from '../../../components/Button';
import { gameSchema, TGameSchema } from '../../../../../game-dev-shared/src/game';
import './styles/creategame.scss';

export default function CreateGame() {
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const { execute } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TGameSchema>({
    resolver: zodResolver(gameSchema)
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const name = data.name;
      const description = data.description;
      const release_date = data.release_date;
      const price = data.price;

      const gameId: number = await execute<number, [string, string, string, number]>(createGame, [name, description, release_date, price]);
      return navigate(`/game/${gameId}`);
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit(onSubmit)} className="create-content">
        <div className="create-title">Create Game</div>
        <div>
          <input {...register('name')} type="text" placeholder="Name" className="create-input" />
          {errors.name && <div className="create-error">{errors.name.message}</div>}
        </div>
        <div>
          <textarea {...register('description')} placeholder="Description" rows={8} className="create-textarea" />
          {errors.description && <div className="create-error">{errors.description.message}</div>}
        </div>
        <div>
          <input
            {...register('release_date', { setValueAs: (v) => (v === '' || v === null ? undefined : new Date(v).toISOString()) })}
            type="datetime-local"
            placeholder="Release Date"
            className="create-input"
          />
          {errors.release_date && <div className="create-error">{errors.release_date.message}</div>}
        </div>
        <div>
          <input
            {...register('price', { setValueAs: (v) => (v === '' || v === null ? undefined : parseInt(v)) })}
            type="text"
            placeholder="Price"
            className="create-input"
          />
          {errors.price && <div className="create-error">{errors.price.message}</div>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
