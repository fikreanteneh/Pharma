import { create } from "zustand";
import { signinRequest, verifyTokenRequest } from "../request/authRequests";
import { AuthResponse } from "../types/authTypes";
import { BaseResponseType } from "../types/requestTypes";
import Cookies from "js-cookie";

type AuthStateType = {
  currentUser: AuthResponse | null;
  status: "authenticated" | "loading" | "failed" | "unauthenticated";
  error: Array<string> ;
  userRole: string;
};

type UseAuthType = {
  authState: AuthStateType;

  setCurrentUser: (payload: AuthResponse | null) => void;
  setLoading: () => void;
  setFailed: (error: Array<string>) => void;

  loadCurrentUser: () => Promise<void>;
  signin: (payload: { email: string; password: string }) => Promise<void>;
  signout: () => void;
  resetAuthFailed: () => void;
};

const useAuth = create<UseAuthType>((set, get) => ({
  authState: <AuthStateType>{
    currentUser: null,
    status: "loading",
    error: [],
    userRole: "",
  },

  setCurrentUser: (payload: AuthResponse | null) => {
    payload
      ? Cookies.set("Authorization", "Bearer " + payload.token, {
          expires: new Date().getDate() + 7,
          path: "/",
        })
      : Cookies.remove("Authorization");

    set({
      authState: {
        currentUser: payload ? payload : null,
        status: payload ? "authenticated" : "unauthenticated",
        error: [],
        userRole: payload ? payload.role.toLowerCase() : "",
      },
    });
  },

  setLoading: () => {
    set({
      authState: {
        ...get().authState,
        status: "loading",
        error: [],
      },
    });
  },

  setFailed: (error) => {
    set({
      authState: {
        ...get().authState,
        status: "failed",
        error: [...get().authState.error, ...error],
      },
    });
  },

  resetAuthFailed: () => {
    set({
      authState: {
        ...get().authState,
        status: get().authState.currentUser ? "authenticated" : "unauthenticated",
        userRole: get().authState ? get().authState.userRole.toLowerCase() : "",
        error: [],
      },
    });
  },

  loadCurrentUser: async () => {
    const token = Cookies.get("Authorization");
    if (!token) return get().setCurrentUser(null);
    const response: BaseResponseType<AuthResponse> = await verifyTokenRequest(
      token
    );
    response.success
      ? get().setCurrentUser(response.message)
      : get().setCurrentUser(null);
  },

  signin: async (payload) => {
    get().setLoading();
    const response = await signinRequest(payload);
    response.success
      ? get().setCurrentUser(response.message)
      : get().setFailed(response.errors);
  },

  signout: () => {
    Cookies.remove("Authorization");
    get().setCurrentUser(null);
  },
}));

export default useAuth;
