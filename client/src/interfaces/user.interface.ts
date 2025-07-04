export interface UserType {
  _id: number | string;
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
