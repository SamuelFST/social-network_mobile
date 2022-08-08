import React, { ReactElement, useReducer } from "react";
import jwtDecode from "jwt-decode";

import axios from "../api/axios";

interface TokenUser {
  profile: string;
  user: string;
}

interface Action {
  type: string;
  payload?: any;
}

interface IAuthContext {
  token: string | null;
  user: string | null;
  profile: string | null;
  login?: (dispatch: any) => void;
}

const defaultValue = { token: null, user: null, profile: null };

const Context = React.createContext<IAuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactElement }) => {
  const reducer = (state: any, action: Action) => {
    switch(action.type) {
      case "login": {
        return { ...state, ...action.payload };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = (dispatch: any) => {
    return async ({ user, password }: { user: string, password: string }) => {
      try {
        const response = await axios.post('/security/login', {
          user,
          password,
        });
        const { accessToken } = response.data;
        const { profile, user: userName } = jwtDecode(accessToken) as TokenUser;

        dispatch({ type: "login", payload: { token: accessToken, profile, user: userName } })
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Context.Provider value={{ ...state, login: login(dispatch) }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
