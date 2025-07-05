import { Cinema, Location } from "@/interfaces/cinema.interface";
import React from "react";
import UpdateForm from "./UpdateForm";
import PopupContainer from "../PopupContainer";

const UpdateFormContainer = ({
  closeForm,
  cinema,
  locations,
}: {
  closeForm: () => void;
  cinema: Cinema;
  locations: Location[];
}) => {
  return (
    <PopupContainer title="Cập nhật rạp phim" closeForm={closeForm}>
      <UpdateForm cinema={cinema} locations={locations} closeForm={closeForm} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
