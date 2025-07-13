import { CinemaCreateOrUpdate } from "@/interfaces/cinema.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getCinemaList = async (param: string = "") => {
  try {
    const res = await api.get(`/cinema${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu rạp!");
  }
};

const createCinema = async (data: CinemaCreateOrUpdate) => {
  try {
    const res = await api.post(`/cinema/add`, data);
    return res;
  } catch (error) {
    catchingError(error, "Thêm rạp thất bại!");
  }
};

const updateCinema = async (data: CinemaCreateOrUpdate) => {
  try {
    const res = await api.patch(`/cinema/update/${data.id}`, data);
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật rạp thất bại!");
  }
};

const getLocationList = async (param: string = "") => {
  try {
    const res = await api.get(`/location${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu địa chỉ!");
  }
};

export const getCinemas = async (
  page: number,
  limit: number,
  name: string | null = null,
  location: string | null = null,
  status: string | null = null
) => {
  let queries = `?page=${page}&limit=${limit}`;

  if (name) {
    queries += `&name=${name}`;
  }

  if (location) {
    queries += `&location=${location}`;
  }

  if (status) {
    queries += `&status=${status}`;
  }

  const res = await getCinemaList(queries);
  return {
    cinemas: res?.cinema,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
    name: name,
    location: location,
    status: status,
  };
};

export { getCinemaList, getLocationList, createCinema, updateCinema };
