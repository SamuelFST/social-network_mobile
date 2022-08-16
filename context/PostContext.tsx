import React, { ReactElement, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

import axios from '../api/axios';
import { Post } from "../models/Post";
import { File } from "../models/File";
import { Action } from "../models/Action";
import { navigate } from "../RootNavigation";

interface IPostContext {
  posts: Post[];
  errorMessage: string | null;
  getPosts: ({ page }: { page: number }) => void;
  likePost?: ({ id }: { id: string }) => void;
  unlikePost?: ({ id }: { id: string }) => void;
  createPost?: ({
    title,
    description,
    image
  }: {
    title: string,
    description: string,
    image?: File
  }) => void;
  clearPosts?: () => void;
}

const defaultValue = {
  posts: [],
  errorMessage: null,
};

const Context = React.createContext<IPostContext>(defaultValue);

const Provider = ({ children }: { children: ReactElement }) => {
  const reducer = (state: any, action: Action) => {
    const { posts } = state;

    switch (action.type) {
      case "show_posts": {
        return {
          ...state,
          posts: [].concat(posts).concat(action.payload),
          errorMessage: null
        };
      }
      case "create_post": {
        return {
          ...state,
          posts: [action.payload, ...posts],
        };
      }
      case "like_post": {
        const index = posts.findIndex(
          (post: Post) => post._id === action.payload.id
        );
        posts[index].liked = action.payload.liked;
        posts[index].likes = posts[index].likes.filter(
          (like: string) => like !== action.payload.profile
        );
        posts[index].likes = [...posts[index].likes, action.payload.profile];
        return { ...state, posts, errorMessage: null };
      }
      case "unlike_post": {
        const index = posts.findIndex(
          (post: Post) => post._id === action.payload.id
        );
        posts[index].liked = action.payload.liked;
        posts[index].likes = posts[index].likes.filter(
          (like: string) => like !== action.payload.profile
        );
        return { ...state, posts, errorMessage: null };
      }
      case "add_error": {
        return { ...state, errorMessage: action.payload };
      }
      case "clear_posts": {
        return { ...state, posts: [], errorMessage: null };
      }
      default: {
        return state;
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getPosts = (dispatch: any) => async ({ page }: { page: number }) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const profile = await SecureStore.getItemAsync("profile");

      const response = await axios.get(`/feed?page=${page}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const posts = response.data.map((post: Post) => {
        return { ...post, liked: post.likes.includes(profile) }
      });
      dispatch({ type: "show_posts", payload: posts });
    } catch (err) {
      dispatch({ type: "add_error", payload: "Ocorreu um erro ao buscar Posts" });
    }
  }

  const likePost = (dispatch: any) => async ({ id }: { id: string }) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const profile = await SecureStore.getItemAsync("profile");

      await axios.post(`/posts/${id}/like`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "like_post", payload: { id, liked: true, profile } });
    } catch (err) {

    }
  }

  const unlikePost = (dispatch: any) => async ({ id }: { id: string }) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const profile = await SecureStore.getItemAsync("profile");

      await axios.post(`/posts/${id}/unlike`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "unlike_post", payload: { id, liked: false, profile } });
    } catch (err) {

    }
  }

  const createPost = (dispatch: any) =>
    async ({
      title,
      description,
      image
    }: {
      title: string,
      description: string,
      image?: File,
    }) => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const data = new FormData();

        data.append("title", title);
        data.append("description", description || "");
        data.append("file", image);

        const response = await axios.post('/posts', data, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        });

        const user = await SecureStore.getItemAsync("user");
        const profile = await SecureStore.getItemAsync("profile");

        const createdPost = {
          ...response.data,
          profile: {
            _id: profile,
            name: user,
          },
        };

        dispatch({
          type: "create_post",
          payload: createdPost,
        });

        navigate("PostList");
      } catch (err) {

      }
    }

  const clearPosts = () => {
    dispatch({
      type: "clear_posts",
    });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getPosts: getPosts(dispatch),
        likePost: likePost(dispatch),
        unlikePost: unlikePost(dispatch),
        createPost: createPost(dispatch),
        clearPosts: clearPosts,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Provider, Context };
