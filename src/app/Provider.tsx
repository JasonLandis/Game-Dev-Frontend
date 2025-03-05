import { ReactNode } from 'react';
import AuthProvider from '../features/auth/lib/providers/AuthProvider';

export default function Provider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
