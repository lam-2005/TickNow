// UpdateFormContainer.tsx
import React from "react";
import PopupContainer from "../PopupContainer";
import UpdateForm from "./UpdateForm";
import { Post } from "@/interfaces/post.interface";

const UpdateFormContainer = ({
  closeForm,
  post,
}: {
  closeForm: () => void;
  post: Post;
}) => {
  return (
    <PopupContainer title="Cập nhật bài viết" closeForm={closeForm}>
      <UpdateForm post={post} closeForm={closeForm} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
