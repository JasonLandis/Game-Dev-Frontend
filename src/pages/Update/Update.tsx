import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import APIError from '../../components/APIError/APIError';
import { gameSchema, TGameSchema, TGame } from '../../../../game-dev-shared/src/games';
import './Update.scss';


export default function Update() {
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

  const [error, setError] = useState<AxiosResponse>();

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
        if (error instanceof AxiosError && error.response) {
          return setError(error.response);
        }

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
  
      const game = response.data;
      return navigate(`/game/${game.game_id}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return setError(error.response);
      }

      showBoundary(error);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete<boolean>(
        `http://localhost:4000/api/games/${id}`,
        {
          withCredentials: true
        }
      );

      return navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return setError(error.response);
      }

      showBoundary(error);
    }
  };

  return (
    <div className="global-page-container">
      <div className="update-container">
        <form onSubmit={handleSubmit(onSubmit)} className="update-content">
          <div className="update-title">Update Game</div>
          <div>
            <input {...register('name')} type="text" placeholder='Name' />
            {errors.name && <div className="update-form-error">{`${errors.name.message}`}</div>}
          </div>
          <div>
            <textarea 
              {...register('description')} 
              placeholder="Description" 
              rows={8}
            />
            {errors.description && <div className="update-form-error">{errors.description.message}</div>}
          </div>
          <div>
            <input {...register('release_date')} type="date" placeholder='Release Date' />
            {errors.release_date && <div className="update-form-error">{`${errors.release_date.message}`}</div>}
          </div>
          <div>
            <input {...register('price')} type="number" placeholder='Price' />
            {errors.price && <div className="update-form-error">{`${errors.price.message}`}</div>}
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <div>
            <button type="button" className='update-delete-button' onClick={onDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
      {error && <APIError error={error} />}
    </div>
  );
}
