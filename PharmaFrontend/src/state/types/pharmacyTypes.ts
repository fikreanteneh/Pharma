export type PharmacyList = {
  authId: string;
  id: number;
  name: string;
  address: {
    lattitude: number;
    longitude: number;
  };
  phoneNumbers: Array<string>;
  emails: Array<string>;
};

