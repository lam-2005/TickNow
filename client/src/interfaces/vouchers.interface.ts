export interface Voucher {
  _id: string;  
  id: string | number; 
  code: string;
  discount_type: number;
  user_count: number;
  max_users: number;
  start_date: string;
  end_date: string;
  is_active: number | string;
}