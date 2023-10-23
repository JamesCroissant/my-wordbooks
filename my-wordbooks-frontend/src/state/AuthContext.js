import { createContext, useContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

// define state of user
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

// Manage the state globally
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider 
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};