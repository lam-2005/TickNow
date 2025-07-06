import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { ScreenReq } from "@/interfaces/screening.interface";

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

export { getScreeningList, addScreen, updateScreen };



