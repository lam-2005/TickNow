import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { VoucherReq } from "@/interfaces/vouchers.interface";
import {
  createVoucher,
  fetchVouchers,
} from "@/utils/redux/slices/voucherSlice";
import { useConfirm } from "@/hooks/contexts/useConfirm";
import dataVoucherSelector from "@/utils/redux/selectors/selectorVoucher";

const initDefault = {
  code: "",
  discount_type: 0,
  user_count: 0,
  max_users: "",
  start_date: "",
  end_date: "",
  is_active: "true",
};

const AddForm = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { filter } = useSelector(dataVoucherSelector);
  const [formData, setFormData] = useState<VoucherReq>(initDefault);
  const [errors, setErrors] = React.useState("");
  React.useEffect(() => {
    setErrors("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (formData.start_date && formData.end_date) {
      if (start >= end) {
        setErrors("Ngày bắt đầu không được lớn hơn hoặc bằng ngày kết thúc");
        return;
      }
    }

    if (formData.end_date && !formData.start_date) {
      setErrors("Vui lòng nhập ngày bắt đầu trước khi nhập ngày kết thúc");
      return;
    }

    if (formData.start_date && formData.end_date) {
      const activeStatus = today >= start && today <= end ? "true" : "false";
      setFormData((prev) => ({
        ...prev,
        is_active: activeStatus,
      }));
    } else if (formData.start_date && !formData.end_date) {
      const activeStatus = today >= start ? "true" : "false";
      setFormData((prev) => ({
        ...prev,
        is_active: activeStatus,
      }));
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
    const sure = await confirm({
      title: "Bạn có muốn thêm?",
      content: "Hành động này sẽ không thể hoàn tác",
    });
    if (!sure) return;
    setLoading(true);
    try {
      await dispatch(
        createVoucher({
          data: {
            ...formData,
            is_active: formData.is_active === "true" ? true : false,
          },
        })
      ).unwrap();
      toast.success("Thêm voucher thành công!");
      await dispatch(
        fetchVouchers({
          limit: 5,
          page: 1,
          code: filter.code,
          status: filter.status,
          timeEnd: filter.timeEnd,
          timeStart: filter.timeStart,
        })
      );
      setFormData(initDefault);
    } catch (err) {
      toast.error(`Thêm voucher thất bại: ${err}`);
      console.error(err);
    } finally {
      setLoading(false); // dừng load
    }
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
        <button
          className="btn disabled:brightness-70"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? "Đang xử lí.." : "Thêm Voucher"}
        </button>
      </div>
    </>
  );
};

export default AddForm;
