import { AuthResponse, PharmacyAuth } from "../types/authTypes";
import RequestClass from "./RequestClass";

export const addPharmacyRequest = async (payload: PharmacyAuth) => {
  return await RequestClass.PostRequest<PharmacyAuth, AuthResponse>(
    payload,
    "Auth/PharmacyRegister"
  );
};
