import { createContext } from 'react';

type TAuthContext = {
  accessToken?: string;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  loggedInUser?: string;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export default AuthContext;
