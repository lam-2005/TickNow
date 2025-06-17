import api from "@/utils/http";

// Lấy danh sách rạp chiếu phim, có thể truyền thêm tham số truy vấn
const getCinemaList = async (param: string = "") => {
  try {
    const res = await api.get(`/cinema${param}`);
    console.log("Dữ liệu API:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp chiếu:", error);
    throw error;
  }
};

// Lấy chi tiết một rạp chiếu cụ thể theo ID
const getCinemaById = async (id: string) => {
  try {
    const res = await api.get(`/cinema/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết rạp với ID: ${id}`, error);
    throw error;
  }
};

export { getCinemaList, getCinemaById };