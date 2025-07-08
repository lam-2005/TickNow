import React from "react";
import PopupContainer from "../../PopupContainer";
import UpdateForm from "./UpdateForm";

const UpdateFormContainer = ({
  id,
  closeForm,
}: {
  id: string;
  closeForm: () => void;
}) => {
  return (
    <PopupContainer title="Cập nhật phòng chiếu" closeForm={closeForm}>
      <UpdateForm closeForm={closeForm} id={id} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
