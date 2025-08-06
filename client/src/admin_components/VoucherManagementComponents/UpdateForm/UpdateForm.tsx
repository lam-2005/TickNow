import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { Voucher, VoucherReq } from "@/interfaces/vouchers.interface";
import {
  fetchVouchers,
  updateVoucher,
} from "@/utils/redux/slices/voucherSlice";
import { useConfirm } from "@/hooks/contexts/useConfirm";
import dataVoucherSelector from "@/utils/redux/selectors/selectorVoucher";
import usePanigation from "@/hooks/usePanigation";

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
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();
  const { currentPage, filter } = useSelector(dataVoucherSelector);
  const { rowsPerPage } = usePanigation(currentPage);
  const [formData, setFormData] = useState<VoucherReq>({
    code: voucher.code,
    discount_type: voucher.discount_type,
    user_count: voucher.user_count,
    max_users: voucher.max_users,
    start_date: formatDate(voucher.start_date),
    end_date: formatDate(voucher.end_date),
    is_active: voucher.is_active,
  });
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
  const handleUpdate = async (e: React.FormEvent) => {
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
      title: "Bạn có muốn cập nhật?",
      content: "Hành động này sẽ không thể hoàn tác",
    });
    if (!sure) return;
    setLoading(true);
    try {
      await dispatch(
        updateVoucher({ id: voucher._id, data: formData })
      ).unwrap();
      toast.success("Cập nhật voucher thành công!");

      await dispatch(
        fetchVouchers({
          page: currentPage,
          limit: rowsPerPage,
          code: filter.code,
          status: filter.status,
          timeEnd: filter.timeEnd,
          timeStart: filter.timeStart,
        })
      );
      closeForm();
    } catch (err) {
      toast.error(`Cập nhật voucher thất bại: ${err}`);
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
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Đang xử lí.." : "Cập nhật Voucher"}
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
