import api from "@/utils/http";
import catchingError from "@/utils/catchingError";

const getDashboardData = async (param: string = "") => {
  try {
    const res = await api.get(`/statistical${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};

export { getDashboardData };
