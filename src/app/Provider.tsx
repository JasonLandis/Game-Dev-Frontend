import { ReactNode } from "react";
import AuthProvider from '../features/auth/lib/providers/AuthProvider';

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export default Provider;
