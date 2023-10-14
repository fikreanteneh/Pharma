import { BaseResponseType } from "../models/Response";

const ReactQueryFetch = async <T>(
  requestCallback: () => Promise<BaseResponseType<T>>
): Promise<T> => {
  const response: BaseResponseType<T> = await requestCallback();
  if (response.message) return response.message;
  throw Error(response.error ?? "Something went wrong");
};

export const handleGetDirectRequest = async <T>(
  requestCallback: () => Promise<T>
): Promise<T> => {
  const response = await requestCallback();
  return response;
};


export const handleUpdateRequest = async<T>(
  requestCallback: () => Promise<T>
): Promise<T> => {
  const response = await requestCallback();
  return response;
}


export default ReactQueryFetch;