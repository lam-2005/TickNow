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
    const res = await api.post(`/cinema/update`, data);
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
export { getCinemaList, getLocationList, createCinema, updateCinema };
