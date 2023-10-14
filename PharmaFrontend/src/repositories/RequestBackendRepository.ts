import supabase from "../config/supabase";
import { BaseResponseType } from "../models/Response";

export default class RequestBackendRepository {
  static HeaderGet = async () => {
    const session = await supabase.auth.getSession();
    return {
      "Content-Type": "application/json",
      authorization: session.data
        ? `Bearer ${session.data.session?.access_token}`
        : "",
    };
  };

  static CatchAsyncErrors<P, R>(
    func: (payload: P) => Promise<BaseResponseType<R>>
  ): (payload: P) => Promise<BaseResponseType<R>> {
    return function (payload: P): Promise<BaseResponseType<R>> {
      return Promise.resolve(func(payload))
        .then((response: BaseResponseType<R>) => {
          return response;
        })
        .catch(() => {
          return {
            success: false,
            error: "Something Went Wrong",
            message: null,
            statusCode: 500,
          };
        });
    };
  }

  static async PostRequest<P, R>(
    payload: P,
    url: string
  ): Promise<BaseResponseType<R>> {
    return this.CatchAsyncErrors<P, R>(async (payload: P) => {
      const head = await this.HeaderGet();
      const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${url}`, {
        headers: head,
        method: "POST",
        body: JSON.stringify({ data: payload }),
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
        headers: await this.HeaderGet(),
        method: "PUT",
        body: JSON.stringify({ data: payload }),
      });
      const data = await response.json();
      return data;
    })(payload);
  }

  static async DeleteRequest<P, R>(
    payload: P,
    url: string
  ): Promise<BaseResponseType<R>> {
    return this.CatchAsyncErrors<P, R>(async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE}/${url}`, {
        headers: await this.HeaderGet(),
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    })(payload);
  }
}
