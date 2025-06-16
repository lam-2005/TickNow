import { MovieType } from "@/interfaces/movie.interface";
import React from "react";
import Ticket from "../Movie/Ticket";
import PopupContainer from "./PopupContainer";

const TicketPopup = ({
  info,
  onClose,
}: {
  info: MovieType;
  onClose: () => void;
}) => {
  return (
    <PopupContainer onClose={onClose}>
      <Ticket info={info} />
    </PopupContainer>
  );
};

export default TicketPopup;

