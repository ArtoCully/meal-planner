import React from 'react';
import { AxiosResponse } from 'axios';
import useProvideAuth from 'src/hooks/useProvideAuth';
interface IUserProvider {
  children?: React.ReactNode,
  currentUser?: any,
  setCurrentUser?: () => void,
  login?: Promise<AxiosResponse>,
  signup?: Promise<AxiosResponse>,
  logout?: () => void,
  sendPasswordResetEmail?: () => void,
  confirmPasswordReset?: () => void,
}

const userContextValue: any = null;
export const UserContext = React.createContext(userContextValue);

export const UserContextProvider = ({ children }: IUserProvider) => {
  const auth = useProvideAuth();

  return (
    <UserContext.Provider
      value={auth}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContextConsumer = UserContext.Consumer;
export default UserContextProvider;
