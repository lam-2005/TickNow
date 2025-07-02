import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { MovieType } from "@/interfaces/movie.interface";

export const getMovieList = async (param: string = "") => {
  try {
    const res = await api.get(`/movie${param}`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    catchingError(error, "Lấy danh sách phim thất bại");
    throw error;
  }
};

export const createMovie = async (data: MovieType) => {
  try {
    const res = await api.post("/movie/add", data); // POST /add
    return res;
  } catch (error) {
    catchingError(error, "Thêm phim thất bại");
    throw error;
  }
};

export const updateMovie = async (id: string | number, data: MovieType) => {
  try {
    const res = await api.patch(`/movie/update/${id}`, data); //  PATCH /update/:id
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật phim thất bại");
    throw error;
  }
};

export const deleteMovie = async (id: string | number) => {
  try {
    const res = await api.delete(`/movie/delete/${id}`); // DELETE /delete/:id
    return res;
  } catch (error) {
    catchingError(error, "Xóa phim thất bại");
    throw error;
  }
};
