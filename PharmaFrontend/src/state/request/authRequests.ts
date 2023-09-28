import * as T from "../../types/formTypes";
import { AuthResponse } from "../types/authTypes";
import { BaseResponseType } from "../types/requestTypes";
import CatchAsyncErrors from "./catchAsyncErrors";
import Cookies from "js-cookie";

export const signinRequest: (
  payload: T.SignIn
) => Promise<BaseResponseType<AuthResponse>> = CatchAsyncErrors<
  T.SignIn,
  AuthResponse
>(async (payload: T.SignIn) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BASE}/Auth/Login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
});

export const verifyTokenRequest: (
  payload: string
) => Promise<BaseResponseType<AuthResponse>> = CatchAsyncErrors<
  string,
  AuthResponse
>(async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_BASE}/Auth/Refresh`, {
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      Authorization: Cookies.get("Authorization") ?? "",
    },
    method: "GET",
  });
  return response.json();
});
