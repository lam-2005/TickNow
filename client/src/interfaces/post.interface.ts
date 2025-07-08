
export type PostType = {
  _id: string;
  id_user: string;
  title: string;
  content: string;
  start_day: string;
  end_day: string;
  status: number | string;
  image: string;
  nameUser: string;
};

export type DataPostReq = {
  image: File | null | string;
  start_day: string;
  end_day: string;
  title: string;
  content: string;
  status?: number | string;
};

