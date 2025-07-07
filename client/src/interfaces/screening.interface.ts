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

export interface Screening {
  _id: string; // MongoDB ObjectId dạng string
  id_room: string;
  id_movie: string;
  time_start: string;
  time_end: string;
  date: string; // Để dễ xử lý ngày, dùng string thay vì Date object
  status: string;
  showtype: string;
  roomCode: string | number;
  // Tuỳ chọn nếu có thể mở rộng
  movieName?: string; // Sử dụng khi bạn join từ collection movie
  role: boolean;
}
export type DetailScreening = {
  _id: string;
  code_room: number;
  id_cinema: string;
  status: number;
  cinema: string;
  diagram: {
    row: number;
    column: number;
    element_remove: { [key: string]: number[] };
    element_selected: { [key: string]: number[] };
    element_selecting: { [key: string]: number[] };
  };
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
    showtimes: {
      id: string;
      time: string;
      showtype: string | number;
    }[];
  }[];
};

export type ScreenReq = {
  id_room: string;
  id_movie: string;
  time_start: string;
  time_end: string;
  date: string; // Để dễ xử lý ngày, dùng string thay vì Date object
  showtype: string;
  roomCode: string | number;
  // Tuỳ chọn nếu có thể mở rộng
  movieName?: string; // Sử dụng khi bạn join từ collection movie
  status?: boolean; // Optional for update
  role?: boolean; // Optional for update
};
