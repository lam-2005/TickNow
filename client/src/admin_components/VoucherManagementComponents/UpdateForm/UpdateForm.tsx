import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { Voucher, VoucherReq } from "@/interfaces/vouchers.interface";
import { fetchVouchers, updateVoucher } from "@/utils/redux/slices/voucherSlice";

type UpdateFormProps = {
  voucher: Voucher;
  closeForm: () => void;
};

const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return "";
  }

  return new Date(date).toISOString().slice(0, 10);
};

const UpdateForm = ({ voucher, closeForm }: UpdateFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<VoucherReq>({
    code: voucher.code,
    discount_type: voucher.discount_type,
    user_count: voucher.user_count,
    max_users: voucher.max_users,
    start_date: formatDate(voucher.start_date),
    end_date: formatDate(voucher.end_date),
    is_active: voucher.is_active,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.code ||
      !formData.discount_type ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.max_users
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const sure = confirm("Bạn có muốn cập nhật?");
      if (!sure) return;

      await dispatch(updateVoucher({ id: voucher._id, data: formData })).unwrap();
      toast.success("Cập nhật voucher thành công!");

      dispatch(fetchVouchers({ limit: 5, page: 1 }));
      closeForm();
    } catch (err) {
      toast.error(`Cập nhật voucher thất bại: ${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleUpdate}>
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
