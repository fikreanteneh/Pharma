import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import supabase from "../config/supabase";
import AuthRepository from "../repositories/AuthRepository";

type AuthStateType = {
  currentUser: Session | null;
  status: "authenticated" | "loading" | "failed" | "unauthenticated";
  error: string | null;
  userRole: string;
};

type UseAuthType = {
  authState: AuthStateType;

  setCurrentUser: (payload: Session | null) => void;
  setLoading: () => void;
  setFailed: (error: string) => void;

  signin: (payload: { email: string; password: string }) => Promise<void>;
  signout: () => void;
  resetAuthFailed: () => void;
};

const useAuth = create<UseAuthType>((set, get) => ({
  authState: <AuthStateType>{
    currentUser: null,
    status: "loading",
    error: null,
    userRole: "",
  },

  setCurrentUser: (payload: Session | null) => {
    payload?.user.role;
    console.log(payload);
    payload
      ? set({
          authState: {
            currentUser: payload ? payload : null,
            status: payload ? "authenticated" : "unauthenticated",
            error: null,
            userRole: payload?.user.user_metadata.role ?? "",
          },
        })
      : set({
          authState: {
            currentUser: null,
            status: "unauthenticated",
            error: null,
            userRole: "",
          },
        });
  },

  setLoading: () => {
    set({
      authState: {
        ...get().authState,
        status: "loading",
        error: null,
      },
    });
  },

  setFailed: (error: string) => {
    set({
      authState: {
        ...get().authState,
        status: "failed",
        error: error,
      },
    });
  },

  resetAuthFailed: () => {
    set({
      authState: {
        ...get().authState,
        status: get().authState.currentUser
          ? "authenticated"
          : "unauthenticated",
        userRole: get().authState ? get().authState.userRole.toLowerCase() : "",
        error: null,
      },
    });
  },

  signin: async (payload) => {
    get().setLoading();
    const resonse = await AuthRepository.signin(payload);
    if (resonse.error) get().setFailed(resonse.error?.message)
  },

  signout: () => {
    supabase.auth.signOut();
  },
}));

export default useAuth;
