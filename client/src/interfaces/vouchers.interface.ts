export interface Voucher {
  [key: string]: any;
  _id: string;
  id: string | number;
  code: string;
  discount_type: number;
  user_count: number;
  max_users: number;
  start_date: string;
  end_date?: string;
  end_day?: string;
  is_active: number | string;
}

export interface VoucherReq {
  code: string;
  discount_type: number;
  user_count: number;
  max_users: number | string;
  start_date: string;
  end_date: string;
  is_active: number | string | boolean;
}
