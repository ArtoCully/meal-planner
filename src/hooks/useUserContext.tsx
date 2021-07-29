import React from "react";
import { UserContext } from "../context/UserContext";

const useUserContext = () => {
  const context = React.useContext(UserContext);
  return context;
};

export default useUserContext;
