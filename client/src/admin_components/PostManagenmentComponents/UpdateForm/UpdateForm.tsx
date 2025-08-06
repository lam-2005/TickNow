import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import usePanigation from "@/hooks/usePanigation";
import { DataPostReq } from "@/interfaces/post.interface";
import { getPostList } from "@/services/post.service";
import InputGroup from "./InputGroup";
import postSelector from "@/utils/redux/selectors/postSelector";
import { fetchPosts, updatePost } from "@/utils/redux/slices/postSlice";
import { useConfirm } from "@/hooks/contexts/useConfirm";

type UpdateFormProps = {
  id: string;
  closeForm: () => void;
  voucherList: string[];
};
const UpdateForm = ({ id, closeForm, voucherList }: UpdateFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, filter } = useSelector(postSelector);
  const { rowsPerPage } = usePanigation(currentPage);
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DataPostReq>({
    image: null,
    start_day: "",
    end_day: "",
    title: "",
    content: "",
    status: 2,
    voucher: "",
  });
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
  useEffect(() => {
    const getPostDetail = async (id: string) => {
      try {
        const res = await getPostList(`/${id}`);
        const data = res?.data;
        setFormData({
          image: data?.image || null,
          start_day: data?.start_day.slice(0, 10) || "",
          end_day: data?.end_day.slice(0, 10) || "",
          title: data?.title || "",
          content: data?.content || "",
          status: data?.status || 2,
          voucher: data?.voucher || "",
        });
      } catch (error) {
        console.error("Failed to fetch post detail", error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetail(id);
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const handleUpdatePost = async (id: string) => {
    setLoading(true); // cho nó load
    try {
      const sure = await confirm({
        title: "Bạn có muốn cập nhật bài viết này?",
        content: "Hành động này sẽ không thể hoàn tác",
      });
      if (sure) {
        await dispatch(updatePost({ id, data: formData })).unwrap();

        await dispatch(
          fetchPosts({
            page: currentPage,
            limit: rowsPerPage,
            title: filter.title,
          })
        );
        toast.success("Cập nhật bài viết thành công!");
        closeForm();
      } else {
        return;
      }
    } catch (err) {
      toast.error(`Cập nhật bài viết thất bại: ${err}`);
      console.error(err);
    } finally {
      setLoading(false); // dừng load
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup
          voucherList={voucherList}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn disabled:brightness-70"
         onClick={() => handleUpdatePost(id)}
          disabled={loading}>
          {loading ? "Đang xử lí.." : "Cập nhật bài viết"}
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
