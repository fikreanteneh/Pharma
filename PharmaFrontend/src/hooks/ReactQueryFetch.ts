import { BaseResponseType } from "../state/types/requestTypes";


const handleRequest = async <T>(
  requestCallback: () => Promise<BaseResponseType<T>>
): Promise<BaseResponseType<T>> => {
  try {
    const response = await requestCallback();
    if (!response.success) {
      throw new Error(response.errors.join('\n'));
    }
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default handleRequest;
