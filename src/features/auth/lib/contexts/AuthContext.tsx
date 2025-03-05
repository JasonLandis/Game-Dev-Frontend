import { createContext } from 'react';

type TAuthContext = {
    accessToken: string | null,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export default AuthContext;
