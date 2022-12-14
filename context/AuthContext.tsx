import React, { ReactElement, useReducer, useContext } from "react";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

import axios from "../api/axios";
import { navigate } from "../RootNavigation";
import { Action } from "../models/Action";

interface TokenUser {
  profile: string;
  user: string;
}

interface IAuthContext {
  token: string | null;
  user: string | null;
  profile: string | null;
  errorMessage?: string | null;
  isLoading: boolean;
  login?: () => void;
  logout?: () => void;
  clearErrorMessage?: () => void;
  register?: () => void;
  tryLocalLogin?: () => void;
}

interface Login {
  user: string;
  password: string;
}

const defaultValue = {
  token: null,
  user: null,
  profile: null,
  errorMessage: null,
  isLoading: true,
};

const Context = React.createContext<IAuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactElement }) => {
  const reducer = (state: any, action: Action) => {
    switch (action.type) {
      case "login": {
        return {
          ...state,
          ...action.payload,
          errorMessage: null,
          isLoading: false
        };
      }
      case "logout": {
        return {
          token: null,
          profile: null,
          user: null,
          errorMessage: null,
        };
      }
      case "user_created": {
        return { ...state, errorMessage: null };
      }
      case "add_error": {
        return { ...state, errorMessage: action.payload };
      }
      case "clear_error_message": {
        return { ...state, errorMessage: null };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = (dispatch: any) => {
    return async ({ user, password }: Login) => {
      try {
        const response = await axios.post('/security/login', {
          user,
          password,
        });
        const { accessToken } = response.data;
        const { profile, user: userName } = jwtDecode(accessToken) as TokenUser;

        await SecureStore.setItemAsync("token", accessToken);
        await SecureStore.setItemAsync("user", userName);
        await SecureStore.setItemAsync("profile", profile);

        dispatch({ type: "login", payload: { token: accessToken, profile, user: userName } });
      } catch (err) {
        dispatch({
          type: "add_error",
          payload: "Ocorreu um erro ao fazer login, verifique o usu??rio e senha e tente novamente",
        });
      }
    }
  };

  const logout = (dispatch: any) => async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("profile");
      dispatch({ type: "logout" });
    } catch (err) {

    }
  }

  const register =
    (dispatch: any) =>
      async ({ user, password }: Login) => {
        try {
          await axios.post('/security/register', {
            user,
            password,
          });

          dispatch({ type: "user_created" });
          navigate("Login");
        } catch (err) {
          dispatch({ type: "add_error", payload: "Ocorreu um erro ao fazer o cadastro" });
        }
      }

  const clearErrorMessage = (dispatch: any) => () => {
    dispatch({ type: "clear_error_message" });
  }

  const tryLocalLogin = (dispatch: any) => async () => {
    let token, user, profile;
    try {
      token = await SecureStore.getItemAsync("token");
      user = await SecureStore.getItemAsync("user");
      profile = await SecureStore.getItemAsync("profile");

      dispatch({ type: "login", payload: { token, user, profile } });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Context.Provider
      value={{
        ...state,
        login: login(dispatch),
        logout: logout(dispatch),
        clearErrorMessage: clearErrorMessage(dispatch),
        register: register(dispatch),
        tryLocalLogin: tryLocalLogin(dispatch),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
