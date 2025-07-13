import React from "react";
import Ticket from "../Movie/Ticket";
import PopupContainer from "./PopupContainer";

const TicketPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <PopupContainer onClose={onClose}>
      <Ticket />
    </PopupContainer>
  );
};

export default TicketPopup;
