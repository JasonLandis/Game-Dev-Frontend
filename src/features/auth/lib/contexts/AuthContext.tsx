import { createContext } from 'react';

type TAuthContext = {
  accessToken: string | undefined;
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  username: string | undefined;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export default AuthContext;
