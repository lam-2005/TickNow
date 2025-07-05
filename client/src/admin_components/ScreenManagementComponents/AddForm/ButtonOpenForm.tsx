// "use client";
// import AddBtn from "@/admin_components/Button/AddBtn";
// import React, {  useState } from "react";
// import AddForm from "./AddForm";
// import PopupContainer from "../../PopupContainer";

// const AddUserBtn = () => {
//   const [openForm, setOpenForm] = useState(false);
//   return (
//     <>
//       <AddBtn onClick={() => setOpenForm(true)} />
//       {openForm && (
//         <PopupContainer
//           title="Thêm người suất chiếu mới"
//           closeForm={() => setOpenForm(false)}
//         >
//           <AddForm/>
//         </PopupContainer>
//       )}
//     </>
//   );
// };

// export default AddUserBtn;
"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { useState } from "react";
import AddForm from "./AddForm";
import PopupContainer from "@/components/Popup/PopupContainer";

const AddScreenBtn = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer onClose={() => setOpenForm(false)}>
          <AddForm />
        </PopupContainer>
      )}
    </>
  );
};

export default AddScreenBtn;
