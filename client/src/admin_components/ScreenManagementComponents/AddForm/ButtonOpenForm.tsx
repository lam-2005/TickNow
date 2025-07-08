"use client";
import AddBtn from "@/admin_components/Button/AddBtn";
import React, { useState } from "react";
import AddForm from "./AddForm";
import PopupContainer from "@/admin_components/PopupContainer";
import { MovieType } from "@/interfaces/movie.interface";
import { RoomType } from "@/interfaces/room.interface";

const AddScreenBtn = ({
  movies,
  rooms,
}: {
  movies: MovieType[];
  rooms: RoomType[];
}) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <AddBtn onClick={() => setOpenForm(true)} />
      {openForm && (
        <PopupContainer
          title="Thêm suất chiếu mới"
          closeForm={() => setOpenForm(false)}
        >
          <AddForm movies={movies} rooms={rooms} />
        </PopupContainer>
      )}
    </>
  );
};

export default AddScreenBtn;
// "use client";
// import AddBtn from "@/admin_components/Button/AddBtn";
// import React, { useState } from "react";
// import AddForm from "./AddForm";
// import PopupContainer from "@/components/Popup/PopupContainer";

// const AddScreenBtn = () => {
//   const [openForm, setOpenForm] = useState(false);

//   return (
//     <>
//       <AddBtn onClick={() => setOpenForm(true)} />
//       {openForm && (
//         <PopupContainer onClose={() => setOpenForm(false)}>
//           <AddForm />
//         </PopupContainer>
//       )}
//     </>
//   );
// };

// export default AddScreenBtn;
