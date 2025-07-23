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
import { useConfirm } from "@/hooks/contexts/useConfirm";

const initDefault = {
  code: "",
  discount_type: 0,
  user_count: 0,
  max_users: "",
  start_date: "",
  end_date: "",
  is_active: "true",
};

const AddForm = ({ closeForm }: { closeForm: () => void }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<VoucherReq>(initDefault);
  const [errors, setErrors] = React.useState("");
  React.useEffect(() => {
    setErrors("");
    const currentDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);
    if (currentDate >= endDate) {
      setErrors("Ngày bắt đầu không được lớn hơn hoặc bằng ngày kết thúc");
      return;
    }
    if (formData.end_date && !formData.start_date) {
      setErrors("Vui lòng nhập ngày bắt đầu trước khi nhập ngày kết thúc");
    }
  }, [formData.start_date, formData.end_date]);
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.discount_type || errors) {
      toast.warning("Vui lòng nhập đầy đủ và đúng thông tin!");
      return;
    }
    if (!formData.max_users && !formData.start_date) {
      toast.warning("Vui lòng nhập số lượng tối đa hoặc ngày bắt đầu!");
      return;
    }
    try {
      const sure = await confirm({
        title: "Bạn có muốn thêm?",
        content: "Hành động này sẽ không thể hoàn tác",
      });
      if (!sure) return;

      await dispatch(
        createVoucher({
          data: {
            ...formData,
            is_active: formData.is_active === "true" ? true : false,
          },
        })
      ).unwrap();
      toast.success("Thêm voucher thành công!");
      dispatch(fetchVouchers({ limit: 5, page: 1 }));
      setFormData(initDefault);
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
          errors={errors}
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
