import React from "react";

interface IUserProvider {
  children?: React.ReactNode,
  currentUser?: any,
  setCurrentUser?: () => void,
}

const userContextValue: any = null;
export const UserContext = React.createContext(userContextValue);

export const UserContextProvider = ({ children, currentUser }: IUserProvider) => {
  const [currentUserState, setCurrentUser] = React.useState(
    currentUser || null
  );

  return (
    <UserContext.Provider
      value={{ currentUser: currentUserState, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContextConsumer = UserContext.Consumer;
export default UserContextProvider;
