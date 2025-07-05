import { DataRoomReq } from "@/interfaces/room.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getRoom = async (param: string = "") => {
  try {
    const res = api.get(`/room${param}`);
    return await res;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};
const addRoomAPI = async (req: DataRoomReq) => {
  try {
    const res = await api.post("/room/add", req);
    return res;
  } catch (error) {
    catchingError(error, "Thêm phòng thất bại!");
  }
};
const updateRoomAPI = async (id: string, req: DataRoomReq) => {
  try {
    const res = await api.patch(`/room/update/${id}`, req);
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật phòng thất bại!");
  }
};
export { getRoom, addRoomAPI, updateRoomAPI };
