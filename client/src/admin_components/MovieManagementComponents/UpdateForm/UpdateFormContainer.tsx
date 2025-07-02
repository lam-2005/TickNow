"use client";
import React from "react";
import PopupContainer from "../../PopupContainer";
import { MovieType } from "@/interfaces/movie.interface";
import UpdateForm from "./UpdateForm";

type Props = {
  info: MovieType;
  closeForm: () => void;
  onSubmit: (data: Partial<MovieType>) => void;
};

const UpdateFormContainer = ({ info, closeForm, onSubmit }: Props) => {
  return (
    <PopupContainer title="✏️ Cập nhật phim" closeForm={closeForm}>
      <UpdateForm data={info} onCancel={closeForm} onSubmit={onSubmit} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
