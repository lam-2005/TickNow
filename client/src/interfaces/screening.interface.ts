// export interface Screening {
//     id: number | string;
//     id_room: number | string;
//     id_movie: number | string;
//     time_start: string;
//     time_end: string;
//     date: Date;
//     status: string;
//     showtype: string;
// }

import { MovieType } from "./movie.interface";
import { RoomType } from "./room.interface";

/// Dữ liệu data lấy về
export interface Screening {
  [key: string]: any; // Cho phép các thuộc tính khác
  _id: string; // MongoDB ObjectId dạng string
  id_room: string;
  id_movie: string;
  time_start: string;
  time_end: string;
  date: string; // Để dễ xử lý ngày, dùng string thay vì Date object
  status: number;
  showtype: string | number;
  roomCode: string | number;
  // Tuỳ chọn nếu có thể mở rộng
  movieName?: string; // Sử dụng khi bạn join từ collection movie
  price: number;
}
export type DetailScreening = {
  _id: string;
  code_room: number;
  id_cinema: string;
  status: number;
  cinema: string;
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
  room: RoomType;
  screening: Screening;
};
export type CinemaShowtimeType = {
  _id: string;
  location: {
    id_location: string;
    deatil_location: string;
    location: string;
  };
  name: string;
  showtimes: [
    {
      id: string;
      time: string;
      showtype: string | number;
    }
  ];
};

export type Showtimes = {
  film: MovieType;
  cinemas: {
    id: string;
    name: string;
    location: {
      id_location: string;
      deatil_location: string;
      location: string;
    };
    showtimes: {
      id: string;
      time: string;
      showtype: string | number;
    }[];
  }[];
};

//Dữ liệu gửi đi
export type ScreenReq = {
  id_room: string;
  id_cinema?: string;
  id_movie: string;
  time_start: string;
  date: string; // Để dễ xử lý ngày, dùng string thay vì Date object
  showtype: string | number;
  // Tuỳ chọn nếu có thể mở rộng
  status?: number | string; // Optional for update
  price?: number | string; // Optional for update
};
