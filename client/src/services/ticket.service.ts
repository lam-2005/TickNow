import api from "@/utils/http";
const getTicketList = async (param: string = "") => {
  try {
    const res = api.get(`/ticket${param}`);
    return await res;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export { getTicketList };
