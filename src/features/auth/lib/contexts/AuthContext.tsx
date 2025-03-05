import { createContext } from 'react';

const AuthContext = createContext<string | null>(null);

export default AuthContext;
