import { Medicine } from "../types/medicineTypes";
import RequestClass from "./RequestClass";



export const addMedicineRequest = async (medicine: Medicine) => {
  return await RequestClass.PostRequest<Medicine, Medicine>(
    medicine,
    "Medicine"
  );
};



export const getMedicineRequest = async (
  pageNumber: number,
  pageSize: number,
  name: string
) => {
  const queryarams = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  })
  name != '' ? queryarams.append('name', name) : null
  return await RequestClass.GetRequest<Array<Medicine>>(
    `Medicine?${queryarams.toString()}`
  );
};



export const searchMedicineRequest = async (
  pageNumber: number,
  pageSize: number,
  name: string = ""
) => {
  return await RequestClass.GetRequest<Array<Medicine>>(
    `Medicine?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
  );
};



export const getMedicineByIdRequest = async (id: number) => {
  return await RequestClass.GetRequest<Array<Medicine>>(`Medicine/${id}`);
};
