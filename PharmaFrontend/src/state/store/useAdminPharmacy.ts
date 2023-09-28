import { create } from "zustand";
import { addPharmacyRequest } from "../request/pharmacyRequest";
import { PharmacyAuth } from "../types/authTypes";
import { PharmacyList } from "../types/pharmacyTypes";

type PharmacyStateType = {
  phamacies: Array<PharmacyList>;
  status: "loading" | "failed" | "loaded" | "idle";
  error: Array<string> | null | string;
};

type PharamcyAuthType = {
  pharmacyState: PharmacyStateType;
  setLoading: () => void;
  setFailed: (error: string | Array<string> | null) => void;
  resetFailed: () => void;

  // loadPharmacy : () => Promise<void>;
  addPharmacy: (payload: PharmacyAuth) => Promise<void>;
  // updatePharmacy: (payload: { email: string; password: string }) => Promise<void>;
  // loadDetail: () => void;
};

const useAdminPharmacy = create<PharamcyAuthType>((set, get) => ({
  pharmacyState: <PharmacyStateType>{
    phamacies: [],
    status: "loaded",
    error: null,
  },

  setLoading: () => {
    set({
      pharmacyState: {
        ...get().pharmacyState,
        status: "loading",
        error: null,
      },
    });
  },

  setFailed: (error) => {
    set({
      pharmacyState: {
        ...get().pharmacyState,
        status: "failed",
        error: error,
      },
    });
  },

  resetFailed: () => {
    set({
      pharmacyState: {
        ...get().pharmacyState,
        status: "loaded",
        error: null,
      },
    });
  },

  loadPharmacy: async () => {
    get().setLoading();
  },

  addPharmacy: async (payload: PharmacyAuth) => {
    get().setLoading();
    const response = await addPharmacyRequest(payload);
    if (response.errors) return get().setFailed(response.errors);
    // const pharmacy: PharmacyType = {
    //   name: payload.name,

    //   id: response.message?.id ?? -1,
    //   authId: response.message?.authId ?? "",
    // }
    set({
      pharmacyState: {
        ...get().pharmacyState,
        status: "loaded",
        error: null,
        phamacies: [...get().pharmacyState.phamacies],
      },
    });
  },
}));

export default useAdminPharmacy;
