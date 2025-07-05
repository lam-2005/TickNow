"use client";
import React from "react";
import PopupContainer from "../../PopupContainer";
import UpdateForm from "./UpdateForm";
import { UserReq, UserType } from "@/interfaces/user.interface";

type Props = {
  info: UserType;
  closeForm: () => void;
  onSubmit: (data: UserReq) => void;
};

const UpdateFormContainer = ({ info, closeForm, onSubmit }: Props) => {
  return (
    <PopupContainer title="✏️ Cập nhật người dùng" closeForm={closeForm}>
      <UpdateForm
        data={info}
        onCancel={closeForm}
        onSubmit={onSubmit}
        onlyEditStatusAndRole={true} // ✅ chỉ cho chỉnh status và role
      />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
