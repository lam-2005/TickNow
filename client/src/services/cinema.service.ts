import api from "@/utils/http";

const getCinemaList = async (param: string = "") => {
  try {
    const res = await api.get(`/cinema${param}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp chiếu:", error);
    throw error;
  }
};
const getLocationList = async (param: string = "") => {
  try {
    const res = await api.get(`/location${param}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    throw error;
  }
};
export { getCinemaList, getLocationList };
