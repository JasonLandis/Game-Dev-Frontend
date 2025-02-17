import { createContext } from 'react';

type TAuthContextType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: () => boolean;
};

const AuthContext = createContext<TAuthContextType>({} as TAuthContextType);

export default AuthContext;
