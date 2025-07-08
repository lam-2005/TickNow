import { Voucher } from "@/interfaces/vouchers.interface";
import catchingError from "@/utils/catchingError";
import api from "@/utils/http";

const getVoucherList = async(param: string = "") =>{
   try {
    const res = await api.get(`/voucher${param}`);
    return res.data;
  } catch (error) {
    catchingError(error, "Lỗi khi lấy dữ liệu rạp!");
  }
}

const createVoucherService = async (data: Voucher) => {
   try {
    const { code, discount_type, start_date, end_date, max_users, is_active} = data;
    const res = await api.post(`/voucher/add`, {
      code,
      discount_type,
      start_date,
      end_date,
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
    const { id, code, discount_type, start_date, end_date, max_users, is_active} = data;
    const res = await api.patch(`/voucher/update/${id}`, {
      code,
      discount_type,
      start_date,
      end_date,
      max_users,
      is_active,
    });
    return res;
  } catch (error) {
    catchingError(error, "Cập nhật voucher thất bại!");
  }
};

export { getVoucherList, createVoucherService, updateVoucherService };