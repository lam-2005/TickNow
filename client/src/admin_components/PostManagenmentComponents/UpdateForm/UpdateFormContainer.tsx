import React from "react";
import PopupContainer from "../../PopupContainer";
import UpdateForm from "./UpdateForm";

const UpdateFormContainer = ({
  id,
  closeForm,
  voucherList,
}: {
  id: string;
  closeForm: () => void;
  voucherList: string[];
}) => {
  return (
    <PopupContainer title="Cập nhật bài viết" closeForm={closeForm}>
      <UpdateForm closeForm={closeForm} id={id} voucherList={voucherList} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
