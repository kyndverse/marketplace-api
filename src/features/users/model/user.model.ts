export interface UserUpdateResponse {
  fullname: string;
  phoneNumber: string | null;
  address: string | null;
}

export interface User {
  id: string;
  fullname: string;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  imageUrl: string | null;
  emailVerified: Date | null;
}
