import { Cinema } from "@/interfaces/cinema.interface";
import { RoomType } from "@/interfaces/room.interface";
import React from "react";
import UpdateForm from "./UpdateForm";
import PopupContainer from "../../PopupContainer";

const UpdateFormContainer = ({
  closeForm,
  info,
  listCinemas,
}: {
  closeForm: () => void;
  info: RoomType;
  listCinemas: Cinema[];
}) => {
  return (
    <PopupContainer title="Cập nhật phòng chiếu" closeForm={closeForm}>
      <UpdateForm cinemas={listCinemas} info={info} closeForm={closeForm} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
