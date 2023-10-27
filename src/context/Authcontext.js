import { createContext, useReducer } from "react";
import {AuthReducer} from './AuthReducer'

const Initial_State = {
    user : null,
    isFetching : false,
    error : false
}


export const Authcontext = createContext(Initial_State);

export const AuthcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Initial_State);

  return (
    <Authcontext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
