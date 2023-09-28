import { create } from "zustand";
import { Medicine } from "../types/medicineTypes";
import { addMedicineRequest, getMedicineRequest, searchMedicineRequest } from "../request/medicineRequest";

type MedicineStateType = {
  medicines: Array<Medicine>;
  status: "loading" | "failed" | "loaded" | "idle";
  error: Array<string>;
};

type MedicineType = {
  medicineState: MedicineStateType;
  setLoading: () => void;
  setFailed: (error: Array<string>) => void;
  resetFailed: () => void;

  addMedicine: (payload: Medicine) => Promise<void>;
  getMedicine: (pageNumber: number, pageSize: number) => Promise<void>;
  searchMedicine: (
    pageNumber: number,
    pageSize: number,
    name: string
  ) => Promise<void>;
  // loadPharmacy : () => Promise<void>;
  // updatePharmacy: (payload: { email: string; password: string }) => Promise<void>;
  // loadDetail: () => void;
};

const useMedicine = create<MedicineType>((set, get) => ({
  medicineState: <MedicineStateType>{
    medicines: [],
    status: "loaded",
    error: [],
  },

  setLoading: () => {
    set({
      medicineState: {
        ...get().medicineState,
        status: "loaded",
        error: [],
      },
    });
  },

  setFailed: (error) => {
    set({
      medicineState: {
        ...get().medicineState,
        status: "failed",
        error: [...get().medicineState.error, ...error],
      },
    });
  },

  resetFailed: () => {
    set({
      medicineState: {
        ...get().medicineState,
        status: "loaded",
        error: [],
      },
    });
  },

  addMedicine: async (payload: Medicine) => {
    get().setLoading();
    const response = await addMedicineRequest(payload);
    if (!response.success) return get().setFailed(response.errors);
    set({
      medicineState: {
        ...get().medicineState,
        status: "loaded",
        error: [],
        medicines: [
          ...get().medicineState.medicines,
          response.message ?? payload,
        ],
      },
    });
  },

  getMedicine: async (pageNumber: number = 0, pageSize: number = 15) => {
    get().setLoading();
    const response = await getMedicineRequest(pageNumber, pageSize);
    if (!response.success) return get().setFailed(response.errors);
    set({
      medicineState: {
        ...get().medicineState,
        status: "loaded",
        error: [],
        medicines: [...response.message ?? []],
      },
    });
  },

  searchMedicine: async (
    pageNumber: number = 0,
    pageSize: number = 15,
    name: string = ""
  ) => {
    get().setLoading();
    const response = await searchMedicineRequest(pageNumber, pageSize, name);
    if (!response.success) return get().setFailed(response.errors);
    set({
      medicineState: {
        ...get().medicineState,
        status: "loaded",
        error: [],
        medicines: [...response.message ?? []],
      },
    });

  },
}));

export default useMedicine;
