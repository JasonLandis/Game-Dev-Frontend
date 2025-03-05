import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../features/auth/lib/hooks/useAuth';

export default function PrivateRoutes() {
  const context = useAuthContext();

  return context.accessToken ? <Outlet /> : <Navigate to="/login" />;
}
