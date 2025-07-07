"use client";
import React, { useState } from "react";
import InputGroup from "../InputGroup";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { Post } from "@/interfaces/post.interface";
// import { createPost, fetchPosts } from "@/utils/redux/slices/postSlice";

const AddForm = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Post>({
    _id: '',
    id_user: '',
    title: '',
    content: '',
    image: '',
    start_day: '',
    end_day: '',
    status: 2,
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.start_day || !formData.end_day) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const sure = confirm("Bạn có muốn thêm bài viết?");
      if (!sure) return;

      // await dispatch(createPost({ data: formData })).unwrap();
      toast.success("Thêm bài viết thành công!");
      // dispatch(fetchPosts({ limit: 5, page: 1 }));
    } catch (err) {
      toast.error(`Thêm thất bại: ${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup formData={formData} setFormData={setFormData} isCreate={true} />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleAdd}>Thêm bài viết</button>
      </div>
    </>
  );
};

export default AddForm;
