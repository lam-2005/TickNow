import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getCinemaList = async (param: string = "") => {
  try {
    const res = await api.get(`/cinema${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu rạp!");
  }
};
const getLocationList = async (param: string = "") => {
  try {
    const res = await api.get(`/location${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu địa chỉ!");
  }
};
export { getCinemaList, getLocationList };
