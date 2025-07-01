import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
const getMovieList = async (param: string = "") => {
  try {
    const res = api.get(`/movie${param}`);

    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};
export { getMovieList };
