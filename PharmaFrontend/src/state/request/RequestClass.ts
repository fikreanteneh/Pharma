import Cookies from "js-cookie";
import { BaseResponseType } from "../types/requestTypes";

export default class RequestClass {
  static HeaderGet = () => {
    return {
      "Content-Type": "application/json",
      credentials: "include",
      Authorization: Cookies.get("Authorization") ?? "unauthenticated",
    };
  };

  static CatchAsyncErrors<P, R>(
    func: (payload: P) => Promise<BaseResponseType<R>>
  ): (payload: P) => Promise<BaseResponseType<R>> {
    return function (payload: P): Promise<BaseResponseType<R>> {
      console.log("sent ---- ", typeof JSON.stringify(payload));
      return Promise.resolve(func(payload))
        .then((response) => {
          console.log("success ---- ", response);
          const res: BaseResponseType<R> = response.success
            ? { success: true, message: response.message, errors: [] }
            : { success: false, errors: response.errors, message: null };
          return res;
        })
        .catch((error) => {
          console.log("error ---- ", error);
          return { success: false, errors: [error.message], message: null };
        });
    };
  }

  static async PostRequest<P, R>(
    payload: P,
    url: string
  ): Promise<BaseResponseType<R>> {
    return this.CatchAsyncErrors<P, R>(async (payload: P) => {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${url}`, {
        headers: this.HeaderGet(),
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    })(payload);
  }

  static async PutRequest<P, R>(
    payload: P,
    url: string
  ): Promise<BaseResponseType<R>> {
    return this.CatchAsyncErrors<P, R>(async (payload: P) => {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${url}`, {
        headers: this.HeaderGet(),
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    })(payload);
  }

  static async DeleteRequest<P, R>(
    payload: P,
    url: string
  ): Promise<BaseResponseType<R>> {
    return this.CatchAsyncErrors<P, R>(async (payload: P) => {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${url}`, {
        headers: this.HeaderGet(),
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    })(payload);
  }

  static async GetRequest<R>(
    url: string
  ): Promise<BaseResponseType<R>> {
    return this.CatchAsyncErrors<null, R>(async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${url}`, {
        headers: this.HeaderGet(),
        method: "GET",
      });
      const data = await response.json();
      return data;
    })(null);
  }
}
