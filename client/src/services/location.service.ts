import api from "@/utils/http";
import catchingError from "@/utils/catchingError";

export const getLocationList = async () => {
  try {
    const res = await api.get("/location");
    return res?.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy danh sách địa điểm!");
  }
};
