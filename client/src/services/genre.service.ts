import api from "@/utils/http";

const getGenreList = async (param: string = "") => {
  try {
    const res = await api.get(`/genre${param}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thể loại", error);
    throw error;
  }
};
export { getGenreList };
