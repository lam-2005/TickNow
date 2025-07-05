// "use client";
// import React from "react";
// import PopupContainer from "../../PopupContainer";
// import UpdateForm from "./UpdateForm";
// import { ScreenReq, Screening } from "@/interfaces/screening.interface";

// type Props = {
//   info: Screening;
//   closeForm: () => void;
//   onSubmit: (data: ScreenReq) => void;
// };

// const UpdateFormContainer = ({ info, closeForm, onSubmit }: Props) => {
//   return (
//     <PopupContainer title="✏️ Cập nhật suất chiếu" closeForm={closeForm}>
//       <UpdateForm
//         data={info}
//         onCancel={closeForm}
//         onSubmit={onSubmit}
//         onlyEditStatusAndRole={true} // ✅ chỉ cho chỉnh status và role
//       />
//     </PopupContainer>
//   );
// };

// export default UpdateFormContainer;

"use client";
import React from "react";
import PopupContainer from "@/components/Popup/PopupContainer"; // ✅ đã sửa
import UpdateForm from "./UpdateForm";
import { ScreenReq, Screening } from "@/interfaces/screening.interface";

type Props = {
  info: Screening;
  closeForm: () => void;
  onSubmit: (data: ScreenReq) => void;
};

const UpdateFormContainer = ({ info, closeForm, onSubmit }: Props) => {
  return (
    <PopupContainer onClose={closeForm}>
      <UpdateForm
        data={info}
        onCancel={closeForm}
        onSubmit={onSubmit}
        onlyEditStatusAndRole={true}
      />
    </PopupContainer>
  );
};

export default UpdateFormContainer;

