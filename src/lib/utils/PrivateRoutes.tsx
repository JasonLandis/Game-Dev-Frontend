import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../../features/auth/lib/hooks/useAuth';

export default function PrivateRoutes() {
  const { accessToken } = useAuthContext();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}
