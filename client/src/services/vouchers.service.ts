import { Voucher } from "@/interfaces/vouchers.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getVoucherList = async (param: string = "") => {
  try {
    const res = await api.get(`/voucher${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu rạp!");
  }
};

const createVoucherService = async (data: Voucher) => {
  try {
    const { code, discount_type, start_date, end_day, max_users, is_active } =
      data;
    const res = await api.post(`/voucher/add`, {
      code,
      discount_type,
      start_date,
      end_day,
      max_users,
      is_active,
    });
    return res;
  } catch (error) {
    catchingError(error, "Thêm voucher thất bại!");
  }
};

const updateVoucherService = async (data: Voucher) => {
  try {
    const {
      id,
      code,
      discount_type,
      start_date,
      end_day,
      max_users,
      is_active,
    } = data;
    const res = await api.patch(`/voucher/update/${id}`, {
      code,
      discount_type,
      start_date,
      end_day,
      max_users,
      is_active,
    });
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật voucher thất bại!");
  }
};

export const getVouchers = async (
  page: number,
  limit: number,
  code: string | null = null,
  timeStart: string | null = null,
  timeEnd: string | null = null,
  status: string | null = null
) => {
  let queries = `?page=${page}&limit=${limit}`;

  if (code) {
    queries += `&code=${code}`;
  }

  if (timeStart) {
    queries += `&timeStart=${timeStart}`;
  }

  if (timeEnd) {
    queries += `&timeEnd=${timeEnd}`;
  }

  if (status) {
    queries += `&status=${status}`;
  }

  const res = await getVoucherList(queries);
  return {
    vouchers: res?.voucher,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
    code: code,
    timeStart: timeStart,
    timeEnd: timeEnd,
    status: status,
  };
};

export { getVoucherList, createVoucherService, updateVoucherService };
