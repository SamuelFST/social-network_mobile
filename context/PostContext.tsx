import React, { ReactElement, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

import axios from '../api/axios';
import { Post } from "../models/Post";
import { Action } from "../models/Action";

interface IPostContext {
  posts: Post[];
  errorMessage: string | null;
  getPosts: () => void;
}

const defaultValue = {
  posts: [],
  errorMessage: null,
};

const Context = React.createContext<IPostContext>(defaultValue);

const Provider = ({ children }: { children: ReactElement }) => {
  const reducer = (state: any, action: Action) => {
    switch(action.type) {
      case "show_posts": {
        return { ...state, posts: action.payload, errorMessage: null };
      }
      case "add_error": {
        return { ...state, errorMessage: action.payload }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getPosts = (dispatch: any) => async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(`/feed`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "show_posts", payload: response.data });
    } catch (err) {
      dispatch({ type: "add_error", payload: "Ocorreu um erro ao buscar Posts" });
    }
  }

  return (
    <Context.Provider
      value={{
        ...state,
        getPosts: getPosts(dispatch),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Provider, Context };
