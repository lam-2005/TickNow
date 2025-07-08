"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { use, useState } from "react";
import AddForm from "./AddForm";
import PopupContainer from "../../PopupContainer";
import Genre from "@/interfaces/genre.interface";

const AddMovieBtn = ({ genre }: { genre: Promise<Genre[]> }) => {
  const [openForm, setOpenForm] = useState(false);
  const listGernes = use(genre);  
  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm phim mới"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm genre={listGernes}/>
        </PopupContainer>
      )}
    </>
  );
};

export default AddMovieBtn;
