import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useServer from '../../../lib/hooks/useServer';
import Button from '../../../components/Button';
import { deleteGame, getGameById, updateGame } from '../gamesService';
import { gameSchema, TGameSchema, TGame } from '../../../../../game-dev-shared/src/game';
import './styles/updategame.scss';

export default function UpdateGame() {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<TGameSchema>({
    resolver: zodResolver(gameSchema)
  });

  const params = useMemo(() => [id], [id]);
  const game: TGame | undefined = useServer(getGameById, params);
  if (game) {
    setValue('name', game.name);
    setValue('description', game.description);
    setValue('release_date', game.release_date?.substring(0, 10));
    setValue('price', game.price);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const name = data.name;
      const description = data.description;
      const release_date = data.release_date;
      const price = data.price;

      if (!id) {
        throw 'No id';
      }

      const gameId = await updateGame(id, name, description, release_date, price);
      return navigate(`/game/${gameId}`);
    } catch (error) {
      showBoundary(error);
    }
  };

  const onDelete = async () => {
    try {
      if (!id) {
        throw 'No id';
      }

      await deleteGame(id);
      return navigate('/');
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="update-container">
      <form onSubmit={handleSubmit(onSubmit)} className="update-content">
        <div className="update-title">Update Game</div>
        <div>
          <input {...register('name')} type="text" placeholder="Name" className="update-input" />
          {errors.name && <div className="update-error">{`${errors.name.message}`}</div>}
        </div>
        <div>
          <textarea {...register('description')} placeholder="Description" rows={8} className="update-textarea" />
          {errors.description && <div className="update-error">{errors.description.message}</div>}
        </div>
        <div>
          <input
            {...register('release_date', { setValueAs: (v) => (v === '' || v === null ? undefined : new Date(v).toISOString()) })}
            type="datetime-local"
            placeholder="Release Date"
            className="update-input"
          />
          {errors.release_date && <div className="update-error">{`${errors.release_date.message}`}</div>}
        </div>
        <div>
          <input
            {...register('price', { setValueAs: (v) => (v === '' || v === null ? undefined : parseFloat(v)) })}
            type="number"
            placeholder="Price"
            step="0.01"
            className="update-input"
          />
          {errors.price && <div className="update-error">{`${errors.price.message}`}</div>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <Button clickEvent={onDelete}>Delete</Button>
      </form>
    </div>
  );
}
