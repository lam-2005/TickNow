"use client";
import React from "react";
import PopupContainer from "../../PopupContainer";
import UpdateForm from "./UpdateForm";
import { LocationType } from "@/interfaces/cinema.interface";

type Props = {
  id: string;
  locations: LocationType[];
  closeForm: () => void;
};

const UpdateFormContainer = ({ id, closeForm, locations }: Props) => {
  return (
    <PopupContainer title="✏️ Cập nhật rạp chiếu" closeForm={closeForm}>
      <UpdateForm id={id} locations={locations} closeForm={closeForm} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
