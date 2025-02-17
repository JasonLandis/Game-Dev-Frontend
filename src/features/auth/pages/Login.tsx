import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import useAuthContext from '../lib/hooks/useAuth';
import { loginSchema, TLoginSchema } from '../../../../../game-dev-shared/src/auth';
import './pages.scss';

function Login() {
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
    </div>
  );
}

export default Login;
