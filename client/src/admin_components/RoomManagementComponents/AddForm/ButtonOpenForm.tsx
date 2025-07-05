"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import { Cinema } from "@/interfaces/cinema.interface";
import React, { use, useState } from "react";
import AddForm from "./AddForm";
import PopupContainer from "../PopupContainer";

const AddRoomBtn = ({ cinemas }: { cinemas: Promise<Cinema[]> }) => {
  const [openForm, setOpenForm] = useState(false);
  const listCinemas = use(cinemas);
  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm phòng chiếu"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm cinemas={listCinemas} />
        </PopupContainer>
      )}
    </>
  );
};

export default AddRoomBtn;
