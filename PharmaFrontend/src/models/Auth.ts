export type AuthResponse = {
  authId: string;
  id: number;
  email: string;
  role: "" | "admin" | "pharmacy";
  token: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type PharmacyAuth = {
  id?: string;
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
  id?: string;
  email: string;
  name: string;
};