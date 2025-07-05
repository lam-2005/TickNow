export interface UserType {
  _id: string;
  name: string;
  phone: string;
  email: string;
  year: number;
  status: number | string; // 1: active, 0: inactive
  role: boolean;
}
export type LoginType = {
  email: string;
  password: string;
};

export type UserReq={
  name: string;
  phone: string;
  email: string;
  year: number | string;
  password: string;
  confirmPassword: string; // Optional for registration
  status?: number | string; // Optional for update
  role?: boolean; // Optional for update
}