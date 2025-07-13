import { MovieType } from "@/interfaces/movie.interface";
import { Screening } from "@/interfaces/screening.interface";

const TICKET_STORAGE_KEY = "current_ticket";
export type TicketTypeLocalStorage = {
  movie: MovieType;
  price: number;
  screening: {
    cinema: string;
    locationData: {
      location: string;
      id_location: string;
      detail_location: string;
    };

    room: string | number;
    screeningInfo: Screening;
  } | null;
  seats: string[];
  total: number;
};
export const saveTicket = (ticket: TicketTypeLocalStorage) => {
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(ticket));
  window.dispatchEvent(new Event("ticket-updated"));
};

export const getTicket = () => {
  const ticket = localStorage.getItem(TICKET_STORAGE_KEY);
  return ticket ? JSON.parse(ticket) : null;
};

export const clearTicket = () => {
  localStorage.removeItem(TICKET_STORAGE_KEY);
};
