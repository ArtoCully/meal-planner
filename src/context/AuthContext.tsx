import React from 'react';
import { AxiosResponse } from 'axios';
import useProvideAuth from 'src/hooks/useProvideAuth';
interface IAuthProvider {
  children?: React.ReactNode,
  currentUser?: any,
  setCurrentUser?: () => void,
  login?: Promise<AxiosResponse>,
  signup?: Promise<AxiosResponse>,
  logout?: () => void,
  sendPasswordResetEmail?: () => void,
  confirmPasswordReset?: () => void,
}

const authContextValue: any = null;
export const AuthContext = React.createContext(authContextValue);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
export default AuthContextProvider;
