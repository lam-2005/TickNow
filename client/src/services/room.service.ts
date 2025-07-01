import catchingError from "@/utils/catchingError";
import api from "@/utils/http";
const getRooom = async (param: string = "") => {
  try {
    const res = api.get(`/room${param}`);
    return await res;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};
export { getRooom };
