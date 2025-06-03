export interface UserType {
  id?: number | string;
  name: string;
  phone: string;
  email: string;
  year: number;           
  status: number | string; // 1: active, 0: inactive
  role: boolean;
}
