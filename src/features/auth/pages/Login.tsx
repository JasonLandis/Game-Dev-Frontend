import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthContext from '../lib/hooks/useAuth';
import Button from '../../../components/Button';
import { loginUser } from '../authService';
import { loginSchema, TLoginSchema } from '../../../../../game-dev-shared/src/auth';
import './styles/login.scss';

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

  const onSubmit = async (data: FieldValues) => {
    try {
      const username = data.username;
      const password = data.password;

      const accessToken = await loginUser(username, password);

      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      return navigate('/');
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-content">
        <div className="login-title">Login</div>
        <div>
          <input {...register('username')} type="text" placeholder="Username" className="login-input" />
          {errors.username && <div className="login-error">{`${errors.username.message}`}</div>}
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="Password" className="login-input" />
          {errors.password && <div className="login-error">{`${errors.password.message}`}</div>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
