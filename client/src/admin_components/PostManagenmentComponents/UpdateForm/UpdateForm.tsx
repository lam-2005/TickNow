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

type UpdateFormProps = {
  id: string;
  closeForm: () => void;
};
const UpdateForm = ({ id, closeForm }: UpdateFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, filter } = useSelector(postSelector);
  const { rowsPerPage } = usePanigation(currentPage);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<DataPostReq>({
    image: null,
    start_day: "",
    end_day: "",
    title: "",
    content: "",
    status: 2,
  });
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
        });
      } catch (error) {
        console.error("Failed to fetch post detail", error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetail(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const handleUpdatePost = async (id: string) => {
    try {
      const sure = confirm("Bạn có muốn cập nhật phòng này?");
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
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={() => handleUpdatePost(id)}>
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default UpdateForm;
