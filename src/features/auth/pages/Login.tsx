import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FieldValues } from 'react-hook-form';
import axios from 'axios';
import useAuthContext from '../lib/hooks/useAuth';
import { loginSchema } from '../../../../../game-dev-shared/src/auth';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import '../auth.scss';

export default function Login() {
  const { showBoundary } = useErrorBoundary();
  const { setAccessToken } = useAuthContext();
  const navigate = useNavigate();

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
    <Form submitFunction={onSubmit} resolver={loginSchema} title={'Login'}>
      <FormInput register={'username'} type={'text'} placeholder={'Username'} />
      <FormInput register={'password'} type={'password'} placeholder={'Password'} />
    </Form>
  );
}
