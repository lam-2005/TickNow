// UpdateForm.tsx
"use client";
import React, { useState } from "react";
import InputGroup from "../InputGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { toast } from "react-toastify";
import { Post } from "@/interfaces/post.interface";
import { updatePost } from "@/utils/redux/slices/postSlice";

type UpdateFormProps = {
  post: Post;
  closeForm: () => void;
};

const UpdateForm = ({ post, closeForm }: UpdateFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Post>(post);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const sure = confirm("Bạn có muốn cập nhật?");
      if (!sure) return;

      await dispatch(updatePost({ data: formData })).unwrap();
      toast.success("Cập nhật bài viết thành công!");
      closeForm();
    } catch (err) {
      toast.error(`Cập nhật thất bại: ${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <div className="space-y-5 px-5 flex-1 overflow-x-hidden overflow-y-auto">
        <InputGroup formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex justify-end p-5 w-full bg-background-card rounded-2xl">
        <button className="btn" onClick={handleUpdate}>Cập nhật</button>
      </div>
    </>
  );
};

export default UpdateForm;
