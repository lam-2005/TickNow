import { VoucherReq } from "@/interfaces/vouchers.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getVoucherList = async (param: string = "") => {
  try {
    const res = await api.get(`/voucher${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu voucher!");
  }
};

const createVoucherService = async (data: VoucherReq) => {
  try {
    const res = await api.post(`/voucher/add`, data);
    return res;
  } catch (error) {
    catchingError(error, "Thêm voucher thất bại!");
  }
};

const updateVoucherService = async (id: string, data: VoucherReq) => {
  try {
    const res = await api.patch(`/voucher/update/${id}`, data);
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật voucher thất bại!");
  }
};

const checkVoucherAPI = async (token: string, code: string) => {
  try {
    return await api.post(
      `/voucher/check`,
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu voucher!");
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
    queries += `&active=${status}`;
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

export {
  getVoucherList,
  createVoucherService,
  updateVoucherService,
  checkVoucherAPI,
};
