import { useState } from "react";
import InputGroup from "./InputGroup";
import { DataPostReq } from "@/interfaces/post.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { addPost, fetchPosts } from "@/utils/redux/slices/postSlice";

const AddForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<DataPostReq>({
    image: null,
    start_day: "",
    end_day: "",
    title: "",
    content: "",
  });

  const handleAddPost = async () => {
    if (
      !formData.image ||
      !formData.start_day ||
      !formData.end_day ||
      !formData.title ||
      !formData.content
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const sure = confirm("Bạn có muốn thêm bài viết này?");
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
        <InputGroup formData={formData} setFormData={setFormData} />
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
