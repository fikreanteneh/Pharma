export type BaseResponseType<T = unknown> = {
  success: boolean;
  message: T | null;
  errors: Array<string>;
};
