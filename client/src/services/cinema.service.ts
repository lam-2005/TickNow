import api from "@/utils/http";
import catchingError from "@/utils/catchingError";
import { CinemaReq } from "@/interfaces/cinema.interface";

const getCinemaList = async (param: string = "") => {
  try {
    const res = await api.get(`/cinema${param}`);
    return res;
  } catch (error) {
    console.error("Error fetching cinema list:", error);
    throw error;
  }
};

const addCinema = async (data: CinemaReq) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);
    formData.append('status', String(data.status));
    formData.append('id_location', data.id_location);
    formData.append('deatil_location', data.deatil_location);

     const res = await api.post("/cinema/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const res = await api.post("/cinema/add", data);
    return res;
  } catch (error) {
    catchingError(error, "Thêm rạp thất bại!");
  }
};

const updateCinema = async (id: string, data: CinemaReq) => {
  try {
    const res = await api.patch(`/cinema/update/${id}`, data);
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật rạp thất bại!");
  }
};

const getCinemaDetail = async (id: string) => {
  try {
    const res = await api.get(`/cinema/${id}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lấy chi tiết rạp thất bại!");
    throw error;
  }
};

export const getCinemaData = async (
  page: number,
  limit: number,
  name: string = "",
  location: string = "",
  status: string = ""
) => {
  const res = await getCinemaList(
    `?page=${page}&limit=${limit}&name=${name}&location=${location}&status=${status}`
  );
  return {
    Cinema: res?.data.cinema,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    name,
    location,
    status,
  };
};

export {
  getCinemaList,
  addCinema,
  updateCinema,
  getCinemaDetail, 
};
