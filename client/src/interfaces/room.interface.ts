export type RoomType = {
  [key: string]: any; // Cho phép các thuộc tính khác
  _id: string;
  cinema?: string;
  code_room: string;
  id_cinema: string;
  location?: {
    id_location?: string;
    deatil_location?: string;
    location?: string;
  };
  diagram: {
    row: number;
    column: number;
    element_remove: { [key: string]: number[] };
    element_selected: { [key: string]: number[] };
    element_selecting: { [key: string]: number[] };
  };
  status: number;
  createAt?: string;
  updateAt?: string;
};

export type DataRoomReq = {
  id_cinema?: string;
  column?: number | string;
  row?: number | string;
  seatRemoved?: { [key: string]: number[] };
  status?: number;
};
