import { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import { DataPostReq } from "@/interfaces/post.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { addPost, fetchPosts } from "@/utils/redux/slices/postSlice";
import { Voucher } from "@/interfaces/vouchers.interface";
import { useConfirm } from "@/hooks/contexts/useConfirm";

const AddForm = ({ vouchers }: { vouchers: Voucher[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<DataPostReq>({
    image: null, //upfile mặc định là null
    start_day: "",
    end_day: "",
    title: "",
    content: "",
    voucher: "",
  });
  const voucherList = vouchers.map((voucher) => voucher.code);
  const confirm = useConfirm();
  const [errors, setErrors] = useState("");
  useEffect(() => {
    setErrors("");
    const currentDate = new Date(formData.start_day);
    const endDate = new Date(formData.end_day);
    if (currentDate >= endDate) {
      setErrors("Ngày bắt đầu không được lớn hơn hoặc bằng ngày kết thúc");
      return;
    }
    if (formData.end_day && !formData.start_day) {
      setErrors("Vui lòng nhập ngày bắt đầu trước khi nhập ngày kết thúc");
    }
    if (formData.start_day && !formData.end_day) {
      setErrors("Vui lòng nhập ngày kết thúc");
    }
  }, [formData.start_day, formData.end_day]);
  const handleAddPost = async () => {
    if (
      !formData.start_day ||
      !formData.end_day ||
      !formData.title ||
      !formData.content
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
    try {
      const sure = await confirm({
        title: "Bạn có muốn thêm bài viết này?",
        content: "Bài viết sẽ được đăng ngay sau khi thêm.",
      });
      if (sure) {
        await dispatch(addPost(formData)).unwrap();
        await dispatch(
          fetchPosts({
            page: 1,
            limit: 5,
            title: "",
          })
        );
        setFormData({
          image: null,
          start_day: "",
          end_day: "",
          title: "",
          content: "",
          voucher: "",
        });
        toast.success("Thêm bài thành công!");
      } else {
        return;
      }
    } catch (err) {
      toast.error(`Thêm bài thất bại: ${err}`);
      console.error(err);
    }
  };
  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          voucherList={voucherList}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleAddPost}>
          Thêm bài viết
        </button>
      </div>
    </>
  );
};

export default AddForm;
