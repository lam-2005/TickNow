"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { useState } from "react";
import AddCinemaForm from "./AddForm";
import PopupContainer from "@/admin_components/PopupContainer";
import { LocationRes } from "@/interfaces/cinema.interface";

const AddCinemaBtn = ({ locations }: { locations: LocationRes[] }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm rạp chiếu mới"
          closeForm={() => setOpenForm(false)}
        >
          <AddCinemaForm locations={locations} closeForm={() => setOpenForm(false)} />
        </PopupContainer>
      )}
    </>
  );
};

export default AddCinemaBtn;
