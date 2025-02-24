import { ReactNode } from 'react';
import AuthProvider from '../features/auth/lib/providers/AuthProvider';

type TProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: TProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
