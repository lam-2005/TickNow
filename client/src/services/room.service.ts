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

const getRoomEmpty = async (param: {
  movie: string;
  timeStart: string;
  date: string;
  cinema: string;
}) => {
  try {
    const res = api.post(`/room/roomempty`, param);
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

export const getRoomData = async (
  page: number,
  limit: number,
  cinema: string = "",
  status: string = ""
) => {
  const res = await getRoom(
    `?page=${page}&limit=${limit}&cinema=${cinema}&status=${status}`
  );
  return {
    rooms: res?.data.room,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    cinema: cinema,
    status: status,
  };
};
export { getRoom, addRoomAPI, updateRoomAPI, getRoomEmpty };
