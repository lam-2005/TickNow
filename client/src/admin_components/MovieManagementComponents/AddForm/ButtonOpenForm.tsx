// admin_components/MovieManagementComponents/AddForm/ButtonOpenForm.tsx

"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { useState } from "react";
import AddForm from "./AddForm";
import PopupContainer from "../../PopupContainer";

const AddMovieBtn = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm phim mới"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm />
        </PopupContainer>
      )}
    </>
  );
};

export default AddMovieBtn;
