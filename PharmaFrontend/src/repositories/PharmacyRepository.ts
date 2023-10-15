import supabase from "../config/supabase";
import { Pharmacy } from "../models/Pharamcy";
import {
  GetPharmacyLocationRequest,
  SearchPharmacyRequest,
} from "../models/Request";
import { BaseResponseType, SupabaseResponse } from "../models/Response";
import RequestBackendRepository from "./RequestBackendRepository";
import RequestSupabaseRepository from "./RequestSupabaseRepository";

export default class PharmacyRepository {
  static updatePharmacy = async (
    pharmacy: Pharmacy
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PostRequest<Pharmacy, null>(
      pharmacy,
      `Pharmacy/${pharmacy.id}`
    );
  };

  static deletePharmacy = async (
    pharmacy: Pharmacy
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PostRequest<Pharmacy, null>(
      pharmacy,
      `Pharmacy/${pharmacy.id}`
    );
  };

  static searchPharamcy = RequestSupabaseRepository.CatchAsyncErrors<
    SearchPharmacyRequest,
    Pharmacy[]
  >(async (payload): Promise<SupabaseResponse<Pharmacy[]>> => {
    const response = await supabase
      .from("pharmacy")
      .select("*")
      .limit(payload.pageSize)
      .ilike("name", `%${payload.search}%`)
      .range(
        payload.pageNumber * payload.pageSize,
        payload.pageNumber * payload.pageSize + payload.pageSize - 1
      );
    return response;
  });

  static getPharmacyById = RequestSupabaseRepository.CatchAsyncErrors<
    string,
    Pharmacy
  >(async (id): Promise<SupabaseResponse<Pharmacy>> => {
    const response = await supabase
      .from("pharmacy")
      .select("*")
      .eq("id", id)
      .single();
    return response;
  });

  static getPharmacyByLocation = RequestSupabaseRepository.CatchAsyncErrors<
    GetPharmacyLocationRequest,
    Pharmacy[]
  >(async (payload): Promise<SupabaseResponse<Pharmacy[]>> => {
    const response = await supabase.rpc("get_pharmacy_ordered_by_address", {
      latitude: payload.address.latitude,
      longitude: payload.address.longitude,
      pagenumber: payload.pageNumber,
      pagesize: payload.pageSize,
    });
    return response;
  });
}
