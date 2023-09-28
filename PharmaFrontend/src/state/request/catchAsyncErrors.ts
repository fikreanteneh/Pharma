import { BaseResponseType } from "../types/requestTypes";

export default function CatchAsyncErrors<P, R>(
  func: (payload: P) => Promise<BaseResponseType<R>>
): (payload: P) => Promise<BaseResponseType<R>> {
  return function (payload: P): Promise<BaseResponseType<R>> {
    return Promise.resolve(func(payload))
      .then((response) => {
        console.log(response);
        const res: BaseResponseType<R> = response.success
          ? { success: true, message: response.message, errors: [] }
          : { success: false, errors: response.errors, message: null };
        return res;
      })
      .catch((error) => {
        console.log(error);
        return { success: false, errors: [error.message], message: null };
      });
  };
}
