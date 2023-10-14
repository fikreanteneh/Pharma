import { BaseResponseType, SupabaseResponse } from "../models/Response";

export default class RequestSupabaseRepository {

  static CatchAsyncErrors<P, R>(
    func: (payload: P) => Promise<SupabaseResponse<R>>
  ): (payload: P) => Promise<BaseResponseType<R>> {
    return function (payload: P): Promise<BaseResponseType<R>> {
      return Promise.resolve(func(payload))
        .then((response: SupabaseResponse<R>) => {
          return {
            success: !response.error,
            error: response.error?.message,
            message: response.data,
            statusCode: response.status,
          };
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
}
