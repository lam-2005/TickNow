import api from "@/utils/http";
const getTicketList = async (param: string = "") => {
  try {
    const res = api.get(`/ticket${param}`);
    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export const getTicketData = async (page: number, limit: number) => {
  const res = await getTicketList(`?page=${page}&limit=${limit}`);
  return {
    ticket: res?.data.ticket,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
  };
};
export { getTicketList };
