"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { useState } from "react";
import PopupContainer from "@/admin_components/PopupContainer";
import AddForm from "./AddForm";
import { Voucher } from "@/interfaces/vouchers.interface";

const AddPostBtn = ({ vouchers }: { vouchers: Voucher[] }) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm bài viết"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm vouchers={vouchers} />
        </PopupContainer>
      )}
    </>
  );
};

export default AddPostBtn;
