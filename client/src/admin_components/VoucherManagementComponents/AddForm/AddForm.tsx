import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { VoucherReq } from "@/interfaces/vouchers.interface";
import {
  createVoucher,
  fetchVouchers,
} from "@/utils/redux/slices/voucherSlice";

const initDefault = {
    code: "",
    discount_type: 0,
    user_count: 0,
    max_users: 0,
    start_date: "",
    end_date: "",
    is_active: "",
}

const AddForm = ({ closeForm }: { closeForm: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<VoucherReq>(initDefault);

  const handleAdd = async (e: React.FormEvent) => {
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
      const sure = confirm("Bạn có muốn thêm?");
      if (!sure) return;

      await dispatch(createVoucher({ data: formData })).unwrap();
      toast.success("Thêm voucher thành công!");
      dispatch(fetchVouchers({ limit: 5, page: 1 }));
      setFormData(initDefault)
    } catch (err) {
      toast.error(`Thêm voucher thất bại: ${err}`);
      console.error(err);
    }

    closeForm();
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleAdd}>
          Thêm voucher
        </button>
      </div>
    </>
  );
};

export default AddForm;
