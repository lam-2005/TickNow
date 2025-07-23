export interface UserType {
  [key: string]: any;
  _id: string;
  name: string;
  phone: string;
  email: string;
  year: number | string;
  status: boolean; // 1: active, 0: inactive
  role: boolean;
}
export type LoginType = {
  email: string;
  password: string;
};

export type UserReq = {
  name: string;
  phone: string;
  email: string;
  year: number | string;
  password: string;
  confirmPassword: string;
  status?: boolean; // Optional for update
  role?: boolean; // Optional for update
};
