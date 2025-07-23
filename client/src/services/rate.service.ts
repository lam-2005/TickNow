import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { ReviewType } from "@/interfaces/rating.interface";
const getRateList = async (param: string = "") => {
  try {
    const res = api.get(`/rate${param}`);
    return await res;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại");
  }
};

export const ratingAPI = async (data: {
  score: number;
  comment: string;
  movie: string;
  ticket: string | number;
}) => {
  try {
    const res = await api.post("/rate/update-rate", data);
    return res;
  } catch (error) {
    catchingError(error, "Thêm dữ liệu thất bại");
  }
};

export const getRateData = async (page: number, limit: number) => {
  const res = await getRateList(`?page=${page}&limit=${limit}`);
  const ratings: ReviewType[] = res?.data.data || [];

  // Lấy danh sách phim gồm id và tên
  const movieMap = new Map<string, string>();
  ratings.forEach((r) => {
    if (!movieMap.has(r.id_movie)) {
      movieMap.set(r.id_movie, r.movieName);
    }
  });

  const movieList = Array.from(movieMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));

  return {
    ratings,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    movies: movieList,
  };
};
export { getRateList };
