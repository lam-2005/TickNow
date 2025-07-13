import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { MovieReq } from "@/interfaces/movie.interface";

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

export const getMovieData = async (page: number, limit: number) => {
  const res = await getMovieList(`?page=${page}&limit=${limit}`);
  return {
    movies: res?.data.movie,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};

export const createMovie = async (data: MovieReq) => {
  try {
    const form = new FormData();

    form.append("name", data.name);
    form.append("release_date", data.release_date);
    form.append("nation", data.nation);
    form.append("language", data.language.toString());
    form.append("duration", data.duration.toString());
    form.append("age", data.age);
    form.append("director", data.director);
    form.append("actor", data.actor);
    form.append("status", data.status.toString());
    form.append("trailer", data.trailer);
    form.append("description", data.description);

    // genre: string[]
    data.genre.forEach((id) => form.append("genre[]", id));

    if (data.image) form.append("image", data.image);
    if (data.banner) form.append("banner", data.banner);

    const res = await api.post("/movie/add", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res; // Vì interceptor đã .data sẵn rồi
  } catch (error) {
    catchingError(error, "Thêm phim thất bại");
    throw error;
  }
};

export const updateMovie = async (id: string | number, data: MovieReq) => {
  try {
    const form = new FormData();

    form.append("name", data.name);
    form.append("release_date", data.release_date);
    form.append("nation", data.nation);
    form.append("language", data.language.toString());
    form.append("duration", data.duration.toString());
    form.append("age", data.age);
    form.append("director", data.director);
    form.append("actor", data.actor);
    form.append("status", data.status.toString());
    form.append("trailer", data.trailer);
    form.append("description", data.description);

    data.genre.forEach((id) => form.append("genre[]", id));

    // Chỉ append nếu là file mới, tránh gửi file cũ dạng string
    if (data.image instanceof File) {
      form.append("image", data.image);
    }

    if (data.banner instanceof File) {
      form.append("banner", data.banner);
    }

    const res = await api.patch(`/movie/update/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    catchingError(error, "Cập nhật phim thất bại");
    throw error;
  }
};
