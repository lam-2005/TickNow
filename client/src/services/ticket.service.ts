// import api from "@/utils/http";
// import { Ticket } from "@/interfaces/ticket.interface";

// // Lấy danh sách vé (có thể truyền query params như ?_limit=5)
// const getTicketList = async (param: string = "") => {
//   try {
//     const res = await api.get(`/ticket${param}`);
//     return res.data; // giả sử API trả về { data, status, message }
//   } catch (error) {
//     console.error("Lỗi khi lấy danh sách vé:", error);
//     throw error;
//   }
// };

// export { getTicketList };


import api from "@/utils/http";
const getTicketList = async (param: string = "") => {
  try {
    const res = await api.get(`/ticket${param}`); // ✅ đảm bảo route đúng chính tả
    return res;
  } catch (error) {
    console.error("Error fetching ticket list:", error);
    throw error;
  }
};

export { getTicketList };
