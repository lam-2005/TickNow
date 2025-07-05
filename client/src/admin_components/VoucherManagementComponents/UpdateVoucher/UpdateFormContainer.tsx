import React from "react";
import UpdateForm from "./UpdateForm";
import PopupContainer from "../PopupContainer";
import { Voucher } from "@/interfaces/vouchers.interface";

const UpdateFormContainer = ({
  closeForm,
  voucher,
}: {
  closeForm: () => void;
  voucher: Voucher;
}) => {
  return (
    <PopupContainer title="Cập nhật voucher" closeForm={closeForm}>
      <UpdateForm voucher={voucher} closeForm={closeForm} />
    </PopupContainer>
  );
};

export default UpdateFormContainer;
