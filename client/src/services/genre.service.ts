import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getGenreList = async (param: string = "") => {
  try {
    const res = await api.get(`/genre${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lấy danh sách thể loại thất bại");
  }
};
export { getGenreList };
