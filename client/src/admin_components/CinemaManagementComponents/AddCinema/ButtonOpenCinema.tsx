"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { use, useState } from "react";
import PopupContainer from "@/admin_components/CinemaManagementComponents/PopupContainer";
import AddForm from "./AddForm";
import { Location } from "@/interfaces/cinema.interface";

const AddCinemaBtn = ({locations}:{locations:Promise<Location[]>}) => {
  const [openForm, setOpenForm] = useState(false);
  const listLocation = use(locations);

  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm rạp chiếu"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm locations={listLocation}  />
        </PopupContainer>
      )}
    </>
  );
};

export default AddCinemaBtn;
