import { useState } from "react";

const usePopup = () => {
  const [trailerPopup, setOpenTrailerPopup] = useState<boolean>(false);
  const [infoPopup, setOpenInfoPopup] = useState<boolean>(false);
  const [ticketPopup, setOpenTicketPopup] = useState<boolean>(false);
  const openTrailer = () => setOpenTrailerPopup(true);
  const closeTrailer = () => setOpenTrailerPopup(false);
  const openInfo = () => setOpenInfoPopup(true);
  const closeInfo = () => setOpenInfoPopup(false);
  const openTicket = () => setOpenTicketPopup(true);
  const closeTicket = () => setOpenTicketPopup(false);
  return {
    trailerPopup,
    openTrailer,
    closeTrailer,
    infoPopup,
    openInfo,
    closeInfo,
    ticketPopup,
    openTicket,
    closeTicket,
  };
};

export default usePopup;
