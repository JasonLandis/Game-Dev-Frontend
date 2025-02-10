import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import APIError from '../../components/APIError/APIError';
import { loginSchema, TLoginSchema } from '../../../../game-dev-shared/src/auth';
import './Login.scss';

export default function Login() {
  const { showBoundary } = useErrorBoundary();
  const { setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const [error, setError] = useState<AxiosResponse>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const username = data.username;
      const password = data.password;

      const response = await axios.post<string>(
        'http://localhost:4000/auth/login',
        {
          username,
          password
        },
        {
          withCredentials: true
        }
      );
  
      const accessToken = response.data;      
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
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
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)} className="login-content">
          <div className="login-title">Login</div>
          <div>
            <input {...register('username')} type="text" placeholder='Username' />
            {errors.username && <div className="login-form-error">{`${errors.username.message}`}</div>}
          </div>
          <div>
            <input {...register('password')} type="password" placeholder='Password' />
            {errors.password && <div className="login-form-error">{`${errors.password.message}`}</div>}
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
