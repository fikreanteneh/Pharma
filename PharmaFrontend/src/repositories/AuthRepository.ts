import supabase from "../config/supabase";
import { AuthRequest, PharmacyAuth } from "../models/Auth";
import RequestBackendRepository from "./RequestBackendRepository";

export default class AuthRepository {
  static signin = async(authRequest: AuthRequest) => {
    const authResponse = await supabase.auth.signInWithPassword({
      email: authRequest.email,
      password: authRequest.password,
    });
    return authResponse;
  }

  static registerPharmacy = async (payload: PharmacyAuth) => {
    return await RequestBackendRepository.PostRequest<PharmacyAuth, null>(
      payload,
      "Auth/PharmacyRegister"
    );
  };

  static registerAdmin = async (payload: PharmacyAuth) => {
    return await RequestBackendRepository.PostRequest<PharmacyAuth, null>(
      payload,
      "Auth/PharmacyRegister"
    );
  };
}
