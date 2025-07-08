"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { useState } from "react";
import PopupContainer from "@/admin_components/VoucherManagementComponents/PopupContainer";
import AddForm from "./AddForm";

const AddVoucherBtn = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm voucher"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm closeForm={() => setOpenForm(false)} />
        </PopupContainer>
      )}
    </>
  );
};

export default AddVoucherBtn;
