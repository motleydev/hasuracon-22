import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { client } from "../utils/client";
import Cookies from "js-cookie";

export enum AUTH {
  AUTHED = "authed",
  NOT_AUTHED = "not_authed",
}

import {
  UserLogin,
  UserLoginMutation,
  UserLoginMutationVariables,
  Signup,
  SignupMutation,
  SignupMutationVariables,
} from "../generated/graphql";

type Maybe<T> = T | null | undefined;

type LocalUser = {
  authed: AUTH;
  id?: string;
  token?: string | null;
  refreshToken?: string | null;
  username?: string;
};

interface HasuraDemo {
  user: LocalUser;
  signup: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const useStore = create<HasuraDemo>()(
  devtools(
    persist(
      (set, get) => ({
        user: { authed: AUTH.NOT_AUTHED },
        signup: (username: string, password: string) => {
          client
            .mutation<SignupMutation, SignupMutationVariables>(Signup, {
              username,
              password,
            })
            .toPromise()
            .then((d) => {
              if (d.data?.signup) {
                const { token, id, refreshToken } = d.data?.signup;
                set({ user: { authed: AUTH.AUTHED, token, id, refreshToken } });
                // Cookies.set("user_authed", "true");
              } else {
                console.log("Error in signing up user");
              }
            })
            .catch((e) => console.log(e));
        },
        logout: () => {
          set({ user: { authed: AUTH.NOT_AUTHED } });
          //   Cookies.set("user_authed", "false");
        },
        login: (username: string, password: string) => {
          client
            .mutation<UserLoginMutation, UserLoginMutationVariables>(
              UserLogin,
              {
                username,
                password,
              }
            )
            .toPromise()
            .then((d) => {
              if (d.data?.login) {
                const { token, id, refreshToken } = d.data?.login;
                set({ user: { authed: AUTH.AUTHED, token, id, refreshToken } });
                // Cookies.set("user_authed", "true");
              } else {
                console.log(d.error);
                console.log("Error in logging in user");
              }
            })
            .catch((e) => console.log(e));
        },
      }),
      {
        name: "hasuracon-22",
        getStorage: () => localStorage,
      }
    )
  )
);

export { useStore };
