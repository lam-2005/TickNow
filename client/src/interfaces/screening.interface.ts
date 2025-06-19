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

export interface Screening {
  id: string; // MongoDB ObjectId dạng string
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
}
