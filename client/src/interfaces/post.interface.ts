export type PostType = {
  [key: string]: any; // Cho phép các thuộc tính khác
  _id: string;
  id_user: string;
  title: string;
  content: string;
  start_day: string;
  end_day: string;
  status: number | string;
  image: string;
  nameUser: string;
  voucher?: string | null; // id voucher
};

export type DataPostReq = {
  image: File | null | string; // up ảnh
  start_day: string;
  end_day: string;
  title: string;
  content: string;
  status?: number | string;
  voucher?: string; // id voucher
};
