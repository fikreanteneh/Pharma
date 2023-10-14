import supabase from "../config/supabase";
import { Medicine } from "../models/Medicine";
import { AddMedicineRequest, SearchMedicineRequest } from "../models/Request";
import { BaseResponseType, SupabaseResponse } from "../models/Response";
import RequestBackendRepository from "./RequestBackendRepository";
import RequestSupabaseRepository from "./RequestSupabaseRepository";

export default class MedicineRepository {
  static addMedicine = async (
    medicine: AddMedicineRequest
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PostRequest<AddMedicineRequest, null>(
      medicine,
      "Medicine"
    );
  };

  static updateMedicine = async (
    medicine: Medicine
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PutRequest<Medicine, null>(
      medicine,
      `Medicine/${medicine.id}`
    );
  };

  static deleteMedicine = async (
    medicine: Medicine
  ): Promise<BaseResponseType<null>> => {
    return await RequestBackendRepository.PostRequest<Medicine, null>(
      medicine,
      `Medicine/${medicine.id}`
    );
  };

  static searchMedicine = RequestSupabaseRepository.CatchAsyncErrors<
    SearchMedicineRequest,
    Medicine[]
  >(async (payload): Promise<SupabaseResponse<Medicine[]>> => {
    const response: SupabaseResponse<Medicine[]> = await supabase
      .from("medicine")
      .select("*")
      .limit(payload.pageSize)
      .ilike("name", `%${name}%`)
      .range(
        payload.pageNumber * payload.pageSize,
        payload.pageNumber * payload.pageSize + payload.pageSize - 1
      );
    return response;
  });

  static getMedicineById = RequestSupabaseRepository.CatchAsyncErrors<
    string,
    Medicine
  >(async (payload): Promise<SupabaseResponse<Medicine>> => {
    const response: SupabaseResponse<Medicine> = await supabase
      .from("medicine")
      .select("*")
      .eq("id", payload)
      .single();
    return response;
  });
}
