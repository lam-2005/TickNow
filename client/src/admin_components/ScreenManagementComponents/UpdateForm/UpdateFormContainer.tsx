"use client";
import React from "react";
import PopupContainer from "../../PopupContainer";
import UpdateForm from "./UpdateForm";
import { ScreenReq, Screening } from "@/interfaces/screening.interface";

type Props = {
  info: Screening;
  closeForm: () => void;
  onSubmit: (data: ScreenReq) => void;
};

const UpdateFormContainer = ({ info, closeForm, onSubmit }: Props) => {
  return (
    <PopupContainer title="✏️ Cập nhật suất chiếu" closeForm={closeForm}>
      <UpdateForm data={info} onCancel={closeForm} onSubmit={onSubmit} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
