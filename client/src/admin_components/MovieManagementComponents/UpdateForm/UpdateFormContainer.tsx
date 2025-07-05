"use client";
import React from "react";
import PopupContainer from "../../PopupContainer";
import { MovieReq, MovieType } from "@/interfaces/movie.interface";
import UpdateForm from "./UpdateForm";
import Genre from "@/interfaces/genre.interface";

type Props = {
  info: MovieType;
  closeForm: () => void;
  onSubmit: (data: MovieReq) => void;
  genre: Genre[];
};

const UpdateFormContainer = ({genre, info, closeForm, onSubmit }: Props) => {
  return (
    <PopupContainer title="✏️ Cập nhật phim" closeForm={closeForm}>
      <UpdateForm genre={genre} data={info} onCancel={closeForm} onSubmit={onSubmit} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
