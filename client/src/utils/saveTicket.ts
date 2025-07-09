const TICKET_STORAGE_KEY = "current_ticket";

export const saveTicket = (ticket: any) => {
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(ticket));
};

export const getTicket = () => {
  const ticket = localStorage.getItem(TICKET_STORAGE_KEY);
  return ticket ? JSON.parse(ticket) : null;
};

export const clearTicket = () => {
  localStorage.removeItem(TICKET_STORAGE_KEY);
};
