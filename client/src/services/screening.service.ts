import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { ScreenReq } from "@/interfaces/screening.interface";

// Lấy dữu liệu từ backend về
const getScreeningList = async (param: string = "") => {
  try {
    const res = await api.get(`/screening${param}`); // ✅ đảm bảo route đúng chính tả
    return res;
  } catch (error) {
    console.error("Error fetching screening list:", error);
    throw error;
  }
};

const addScreen = async (data: ScreenReq) => {
  try {
    const res = await api.post("/screening/add", data);
    return res;
  } catch (error) {
    catchingError(error, "Thêm thất bại!");
  }
};

const updateScreen = async (id: string, req: ScreenReq) => {
  try {
    const res = await api.patch(`/screening/update/${id}`, req);
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật thất bại!");
  }
};

// Dùng hàm lấy dữ liệu từ backend về ở phía trên để tạo hàm lưu dữ liệu cho redux
// tất cả các cái lọc dù lọc nhiều hay ít đề khai báo là string và để mặc định là ""
export const getScreenData = async (
  page: number, //trang
  limit: number, /// giới hạn
  movie: string = "", // lọc theo movie
  date: string = "", // loc theo ...
  status: string = "", // loc theo ...
  showtype: string = "", // loc theo ...
  timeStart: string = "", // loc theo ...
  timeEnd: string = "" // loc theo ...
) => {
  const res = await getScreeningList(
    // url bao gồm trang bao nhiêu giới hạn bao nhiêu lọc những gì
    `?page=${page}&limit=${limit}&movie=${movie}&date=${date}&status=${status}&showtype=${showtype}&timeStart=${timeStart}&timeEnd=${timeEnd}`
  );
  return {
    Screen: res?.data.result, // lưu dữ liệu lấy về từ hàm ở dòng 48
    total: res?.data.pagination.total, // tổng cộng phần tử trong dữ liệu lấy về
    currentPage: res?.data.pagination.page, // trang hiện tại là bn
    totalPages: res?.data.pagination.totalPages, // tồng bao nhiêu trang
    movie, //lọc dư liệu
    date, //lọc dư liệu
    status, //lọc dư liệu
    showtype, //lọc dư liệu
    timeEnd, //lọc dư liệu
    timeStart, //lọc dư liệu
  };
};

export { getScreeningList, addScreen, updateScreen };
