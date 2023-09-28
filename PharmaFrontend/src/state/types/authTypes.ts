export type AuthResponse = {
  authId: string;
  id: number;
  email: string;
  role: "" | "admin" | "pharmacy";
  token: string;
};

export type PharmacyAuth = {
  authId?: string;
  id?: number;
  email: string;
  password: string;
  name: string;
  address: {
    lattitude: number;
    longitude: number;
  };
  phoneNumbers: Array<string>;
  emails: Array<string>;
};


export type AdminAuth = {
  authId?: string;
  id?: number;
  email: string;
  name: string;
};