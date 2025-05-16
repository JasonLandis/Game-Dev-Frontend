import { ReactNode } from 'react';
import { AuthProvider } from '../features/auth/auth.ts';

type TProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: TProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
