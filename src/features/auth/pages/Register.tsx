import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthContext from '../lib/hooks/useAuth';
import Button from '../../../components/Button';
import { registerUser } from '../authService';
import { registerSchema, TRegisterSchema } from '../../../../../game-dev-shared/src/auth';
import './styles/register.scss';

export default function Register() {
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

  const onSubmit = async (data: FieldValues) => {
    try {
      const username = data.username;
      const email = data.email;
      const password = data.password;
      const confirmPassword = data.confirmPassword;

      const accessToken = await registerUser(username, email, password, confirmPassword);

      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      return navigate('/');
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-content">
        <div className="register-title">Register</div>
        <div>
          <input {...register('username')} type="text" placeholder="Username" className="register-input" />
          {errors.username && <div className="register-error">{errors.username.message}</div>}
        </div>
        <div>
          <input {...register('email')} type="text" placeholder="Email" className="register-input" />
          {errors.email && <div className="register-error">{errors.email.message}</div>}
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="Password" className="register-input" />
          {errors.password && <div className="register-error">{errors.password.message}</div>}
        </div>
        <div>
          <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className="register-input" />
          {errors.confirmPassword && <div className="register-error">{errors.confirmPassword.message}</div>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
