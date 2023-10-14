import { Admin, AdminCreate, AdminUpdate } from "./Admin";
import { Medicine, MedicineCreate, MedicineUpdate } from "./Medicine";
import { Pharmacy, PharmacyCreate, PharmacyUpdate } from "./Pharamcy";
import { PharmacyMedicine, PharmacyMedicineCreate, PharmacyMedicineUpdate } from "./PharamcyMedicine";


export default interface Database {
  public: {
    Tables: {
      medicine: {
        Row: Medicine;
        Insert: MedicineCreate;
        Update: MedicineUpdate;
      };
      pharmacymedicine: {
        Row: PharmacyMedicine;
        Insert: PharmacyMedicineCreate;
        Update: PharmacyMedicineUpdate;
      };
      pharmacy: {
        Row: Pharmacy;
        Insert: PharmacyCreate;
        Update: PharmacyUpdate;
      };
      admin: {
        Row: Admin;
        Insert: AdminCreate;
        Update: AdminUpdate;
      };
    };
  };
}

