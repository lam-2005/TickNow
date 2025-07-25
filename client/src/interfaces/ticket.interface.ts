import { Cinema } from "./cinema.interface";
import { MovieType } from "./movie.interface";
import { Screening } from "./screening.interface";
import { UserType } from "./user.interface";

export interface Ticket {
  _id: string | number; // ID của vé (MongoDB ObjectId)
  [key: string]: any; // Allow string, number, and string[] types
  id_user: string; // ID người dùng đặt vé
  id_screening: string; // ID suất chiếu
  price: number; // Giá vé
  type: number; // Trạng thái vé
  seat: string[]; // Danh sách ghế, ví dụ ["A1", "A2"]
  userName: string; // Tên người dùng
  screeningTime: string; // Thời gian chiếu
  id_voucher: string;
  cinema: Cinema;
  room: { id: string; code: string };
}

export interface TicketDetail {
  screening: Screening;
  room: {
    id_room: string;
    code_room: string;
    id_cinema: string;
    name_cinema: string;
    location: {
      id_location: string;
      deatil_location: string;
      location: string;
    };
  };
  movie: MovieType;
  user: UserType;
  ticket: Ticket;
}
export type DataTicketReq = {
  token: string;
  ticket: {
    id_movie: string;
    id_cinema: string;
    id_room: string;
    totalrice: number;
    id_showtime: string;
    date: string;
    time: string;
    seatSelected: string[];
  };
};

export type DataTicketUserList = {
  tickets: {
    _id: string;
    code: number | string;
    id_user: string;
    id_screening: string;
    seat: string[];
    id_voucher: string;
    price: number;
    type: number;
    autoDeleteAt: string;
    createdAt: string;
    updatedAt: string;
    userName: string;
    movie: string;
    status_cmt?: number;
  }[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
