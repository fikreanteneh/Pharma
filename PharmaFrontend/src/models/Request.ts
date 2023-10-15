// Medicine Request

export type SearchMedicineRequest = {
  pageNumber: number;
  pageSize: number;
  search: string;
};
export type GetMedicineByIdRequest = {
  id: number;
};
export type GetMedicineRequest = {
  pageNumber: number;
  pageSize: number;
};

export type AddMedicineRequest = {
  name: string;
  exactname: string;
  amount: number;
};

//Pharmacy Request
export type SearchPharmacyRequest = {
  pageNumber: number;
  pageSize: number;
  search: string;
};

export type GetPharmacyByIdRequest = {
  id: number;
};

export type GetPharmacyLocationRequest = {
  address: {
    latitude: number;
    longitude: number;
  };
  pageNumber: number;
  pageSize: number;
};

//PharmacyMedicine Request
export type GetStoreRequest = {
  pharmacyId: number;
};

export type GetPharmacyByMedicineRequest = {
  medicineid: string;
  address: {
    latitude: number;
    longitude: number;
  };
  pageNumber: number;
  pageSize: number;
};

export type GetMedicineByPharmacyRequest = {
  pharmacyid: string;
  pageNumber: number;
  pageSize: number;
};
