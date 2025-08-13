import catchingError from "@/utils/catchingError";
import api from "@/utils/http";
const getTicketList = async (param: string = "") => {
  try {
    const res = await api.get(`/ticket${param}`);
    return res;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại!");
  }
};
export const getTicketData = async (
  page: number,
  limit: number,
  movieId: string = "",
  date: string = "",
  type: string = "",
  screening: string = ""
) => {
  const res = await getTicketList(
    `?page=${page}&limit=${limit}&movieId=${movieId}&date=${date}&type=${type}&screening=${screening}`
  );
  return {
    ticket: res?.data.tickets,
    total: res?.data.pagination.total,
    currentPage: res?.data.pagination.page,
    totalPages: res?.data.pagination.totalPages,
    movieId,
    date,
    type,
    screening,
  };
};
interface CheckoutResponse {
  payUrl: string;
  // Add other fields if the API returns more data
}
export const checkoutTicket = async (
  token: string,
  data: {
    price: number | string;
    screening: string;
    voucher?: string;
    seat: string[];
  }
): Promise<CheckoutResponse | undefined> => {
  try {
    return await api.post("payos/create-payment-link", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    catchingError(error, "Thanh toán thất bại!");
  }
};
const getTicketUserList = async (param?: string, token?: string) => {
  try {
    const res = await api.get(`/ticket${param}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại!");
  }
};
const cancelTicketAPI = async (id: string) => {
  try {
    await api.post(`ticket/cancel/${id}`, {});
  } catch (error) {
    catchingError(error, "Lấy dữ liệu thất bại!");
  }
};
export { getTicketList, getTicketUserList, cancelTicketAPI };
