"use client";
import React from "react";
import PopupContainer from "../../PopupContainer";
import UpdateForm from "./UpdateForm";
import { MovieType } from "@/interfaces/movie.interface";
import { RoomType } from "@/interfaces/room.interface";

type Props = {
  id: string;
  movies: MovieType[];
  rooms: RoomType[];
  closeForm: () => void;
};

const UpdateFormContainer = ({ id, closeForm, rooms, movies }: Props) => {
  return (
    <PopupContainer title="✏️ Cập nhật suất chiếu" closeForm={closeForm}>
      <UpdateForm id={id} rooms={rooms} movies={movies} closeForm={closeForm} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
