import supabase from "../config/supabase";
import { PharmacyMedicine } from "../models/PharamcyMedicine";
import { GetMedicineByPharmacyRequest, GetPharmacyByMedicineRequest } from "../models/Request";
import { BaseResponseType, SupabaseResponse } from "../models/Response";
import RequestBackendRepository from "./RequestBackendRepository";
import RequestSupabaseRepository from "./RequestSupabaseRepository";

export default class PharmacyMedicineRepository {
  static addPharmacyMedicine = async (
    pharmacyMedicine: PharmacyMedicine
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PostRequest<PharmacyMedicine, null>(
      pharmacyMedicine,
      "PharmacyMedicine"
    );
  };

  static updatePharamcyMedicine = async (
    pharmacyMedicine: PharmacyMedicine
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PutRequest<PharmacyMedicine, null>(
      pharmacyMedicine,
      `PharmacyMedicine/${pharmacyMedicine.id}`
    );
  };

  static deleteMedicine = async (
    pharmacyMedicine: PharmacyMedicine
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PostRequest<PharmacyMedicine, null>(
      pharmacyMedicine,
      `PharmacyMedicine/${pharmacyMedicine.id}`
    );
  };

  static getStoreItems = RequestSupabaseRepository.CatchAsyncErrors<
    string,
    PharmacyMedicine[]
  >(
    async (
      pharmacyid: string
    ): Promise<SupabaseResponse<PharmacyMedicine[]>> => {
      const response = await supabase
        .from("pharmacymedicine")
        .select(`*,medicine (*)`)
        .eq("pharmacyid", pharmacyid);
      return response;
    }
  );

  static getPharmacyByMedicine = RequestSupabaseRepository.CatchAsyncErrors<
    GetPharmacyByMedicineRequest,
    PharmacyMedicine[]
  >(async (payload): Promise<SupabaseResponse<PharmacyMedicine[]>> => {
    const response = await supabase.rpc(
      "get_pharmacy_by_medicine_ordered_by_address",
      {
        latitude: payload.address.latitude,
        longitude: payload.address.longitude,
        medicine: payload.medicineid,
        pagenumber: payload.pageNumber,
        pagesize: payload.pageSize,
      }
    );
    return response;
  });
  static getMedicineByPharmacy = RequestSupabaseRepository.CatchAsyncErrors<
    GetMedicineByPharmacyRequest,
    PharmacyMedicine[]
  >(async (payload): Promise<SupabaseResponse<PharmacyMedicine[]>> => {
    const response = await supabase.rpc(
      "get_medicine_by_pharamcy",
      {
        pharmacyid: payload.pharmacyid,
        pageSize: payload.pageSize,
        pageNumber: payload.pageNumber,
      }
    );
    console.log(response);
    return response;
  });
}
