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
export type CinemaShowtimeType = {
  id: string;
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
      showtype: string;
    }
  ];
};

export type ScreenReq={
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
}