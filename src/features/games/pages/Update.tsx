import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { gameSchema, TGameSchema, TGame } from '../../../../../game-dev-shared/src/games';
import '../games.scss';

function Update() {
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

  useEffect(() => {
    const getGameById = async () => {
      try {
        const response = await axios.get<TGame>(`http://localhost:4000/api/games/${id}`);
        const game = response.data;

        setValue('name', game.name);
        setValue('description', game.description);
        setValue('release_date', game.release_date?.substring(0, 10));
        setValue('price', game.price);
      } catch (error) {
        showBoundary(error);
      }
    };

    getGameById();
  }, [showBoundary, id, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const name = data.name;
      const description = data.description;
      const release_date = data.release_date;
      const price = data.price;

      const response = await axios.put<TGame>(
        `http://localhost:4000/api/games/${id}`,
        {
          name,
          description,
          release_date,
          price
        },
        {
          withCredentials: true
        }
      );

      const gameId = response.data;
      return navigate(`/game/${gameId}`);
    } catch (error) {
      showBoundary(error);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete<boolean>(`http://localhost:4000/api/games/${id}`, {
        withCredentials: true
      });

      return navigate('/');
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="global-page-container">
      <div className="update-container">
        <form onSubmit={handleSubmit(onSubmit)} className="update-content">
          <div className="update-title">Update Game</div>
          <div>
            <input {...register('name')} type="text" placeholder="Name" />
            {errors.name && <div className="update-form-error">{`${errors.name.message}`}</div>}
          </div>
          <div>
            <textarea {...register('description')} placeholder="Description" rows={8} />
            {errors.description && <div className="update-form-error">{errors.description.message}</div>}
          </div>
          <div>
            <input
              {...register('release_date', { setValueAs: (v) => (v === '' || v === null ? undefined : new Date(v).toISOString()) })}
              type="datetime-local"
              placeholder="Release Date"
            />
            {errors.release_date && <div className="update-form-error">{`${errors.release_date.message}`}</div>}
          </div>
          <div>
            <input
              {...register('price', { setValueAs: (v) => (v === '' || v === null ? undefined : parseFloat(v)) })}
              type="number"
              placeholder="Price"
              step="0.01"
            />
            {errors.price && <div className="update-form-error">{`${errors.price.message}`}</div>}
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <div>
            <button type="button" className="update-delete-button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
