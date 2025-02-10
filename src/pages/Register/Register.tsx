import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import APIError from '../../components/APIError/APIError';
import { registerSchema, TRegisterSchema } from '../../../../game-dev-shared/src/auth';
import './Register.scss';

export default function Login() {
  const { showBoundary } = useErrorBoundary();
  const { setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema)
  });

  const [error, setError] = useState<AxiosResponse>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const username = data.username;
      const email = data.email;
      const password = data.password;

      const response = await axios.post<string>(
        'http://localhost:4000/auth/register',
        {
          username,
          email,
          password,
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
      <div className="register-container">
        <form onSubmit={handleSubmit(onSubmit)} className="register-content">
          <div className="register-title">Register</div>
          <div>
            <input {...register('username')} type="text" placeholder='Username' />
            {errors.username && <div className="register-form-error">{`${errors.username.message}`}</div>}
          </div>
          <div>
            <input {...register('email')} type="text" placeholder='Email' />
            {errors.email && <div className="register-form-error">{`${errors.email.message}`}</div>}
          </div>
          <div>
            <input {...register('password')} type="password" placeholder='Password' />
            {errors.password && <div className="register-form-error">{`${errors.password.message}`}</div>}
          </div>
          <div>
            <input {...register('confirmPassword')} type="password" placeholder='Confirm Password' />
            {errors.confirmPassword && <div className="register-form-error">{`${errors.confirmPassword.message}`}</div>}
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
