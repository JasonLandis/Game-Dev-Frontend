import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import APIError from '../../components/APIError/APIError';
import { createUpdateGameSchema, TCreateUpdateGameSchema, TGame } from '../../../../game-dev-shared/src/games';
import './Create.scss';


export default function Create() {
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TCreateUpdateGameSchema>({
    resolver: zodResolver(createUpdateGameSchema)
  });

  const [error, setError] = useState<AxiosResponse>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const name = data.name;
      const description = data.description;
      const release_date = data.release_date;
      const price = data.price;

      const response = await axios.post<TGame>(
        'http://localhost:4000/api/games',
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

  return (
    <div className="global-page-container">
      <div className="create-container">
        <form onSubmit={handleSubmit(onSubmit)} className="create-content">
          <div className="create-title">Create Game</div>
          <div>
            <input {...register('name')} type="text" placeholder='Name' />
            {errors.name && <div className="create-form-error">{`${errors.name.message}`}</div>}
          </div>
          <div>
            <textarea 
              {...register('description')} 
              placeholder="Description" 
              rows={8}
            />
            {errors.description && <div className="create-form-error">{errors.description.message}</div>}
          </div>
          <div>
            <input {...register('release_date')} type="date" placeholder='Release Date' />
            {errors.release_date && <div className="create-form-error">{`${errors.release_date.message}`}</div>}
          </div>
          <div>
            <input {...register('price')} type="number" placeholder='Price' />
            {errors.price && <div className="create-form-error">{`${errors.price.message}`}</div>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
      {error && <APIError error={error} />}
    </div>
  );
}
