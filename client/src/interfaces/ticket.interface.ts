export interface Ticket {
  _id: string; // ID của vé (MongoDB ObjectId)
  id_user: string; // ID người dùng đặt vé
  id_screening: string; // ID suất chiếu
  price: number; // Giá vé
  type: "Đã Thanh Toán" | "Chưa Thanh Toán"; // Trạng thái vé
  seat: string[]; // Danh sách ghế, ví dụ ["A1", "A2"]
  userName: string; // Tên người dùng
  screeningTime: string; // Thời gian chiếu
}

export interface TicketDetail extends Ticket {
  cinema: { id: string; name: string };
  room: { id: string; code: string };
  movie: { id: string; name: string; img: string };
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
