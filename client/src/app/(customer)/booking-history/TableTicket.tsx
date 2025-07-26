"use client";
import RatePopup from "@/components/Popup/RatePopup";
import usePopup from "@/hooks/usePopup";
import { DataTicketUserList } from "@/interfaces/ticket.interface";
import React, { useEffect, useState } from "react";
import TicketInfo from "./TicketInfo";
import { toast } from "react-toastify";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { getTicketUserList } from "@/services/ticket.service";
const TableTicket = ({
  data,
  token,
}: {
  data: DataTicketUserList;
  token: string;
}) => {
  const [idTicket, setIdTickket] = useState("");
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<DataTicketUserList | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setNewData(data);
  }, [data]);
  const {
    ticketPopup,
    openTicket,
    closeTicket,
    closeRating,
    openRating,
    ratingPopup,
  } = usePopup();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-Vn", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const handleGetIdTicket = (id: string) => {
    setIdTickket(id);
    openRating();
  };
  const handleGetIdTicketInfo = (id: string) => {
    setIdTickket(id);
    openTicket();
  };
  const getNewData = async () => {
    try {
      setLoading(true);
      const res = await getTicketUserList(`?page=${page}&limit=5`, token);
      setNewData(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getNewData();
  }, [page]);
  return (
    <>
      {ticketPopup && <TicketInfo onClose={closeTicket} idTicket={idTicket} />}
      {ratingPopup && (
        <RatePopup
          idTicket={idTicket}
          onClose={closeRating}
          onRated={getNewData}
        />
      )}
      <table border={0} className="w-full">
        <thead className="[&_th]:text-center [&_th]:py-2 [&_th]:px-4 [&_th]:text-sm [&_th]:font-semibold border-1 border-primary">
          <tr className="bg-primary text-white">
            <th className="">Mã đặt vé</th>
            <th className="">Ngày giao dịch</th>
            <th className="">Tên phim</th>
            <th className="">Chi tiết vé</th>
            <th className="">Trạng thái</th>
            <th className="">Đánh giá phim</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={6} className="p-4 text-center">
                Đang tải dữ liệu...
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="[&_tr]:even:bg-background-card border-1 border-foreground">
            {newData?.tickets.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="py-2">{item.code}</td>
                <td className="py-2">{formatDate(item.updatedAt)}</td>
                <td className="py-2 max-w-[500px]">
                  <p className="line-clamp-1">{item.movie}</p>
                </td>

                <td className="py-2">
                  <button
                    className="text-primary hover:underline"
                    onClick={() => handleGetIdTicketInfo(item._id)}
                  >
                    Xem
                  </button>
                </td>
                <td className="py-2 ">
                  {item.type === 1 ? (
                    <p className="text-red-500 font-bold w-fit mx-auto rounded-full px-2.5 py-0.5 bg-red-300">
                      Thanh toán thất bại
                    </p>
                  ) : item.type === 2 ? (
                    <p className="text-green-600 font-bold w-fit mx-auto rounded-full px-2.5 py-0.5 bg-green-300">
                      Đã thanh toán
                    </p>
                  ) : (
                    <p className="text-red-500 font-bold w-fit mx-auto rounded-full px-2.5 py-0.5 bg-red-300">
                      Đã bị hủy
                    </p>
                  )}
                </td>
                <td className="py-2">
                  {item?.status_cmt && item?.status_cmt === 1 ? (
                    <p
                      className="text-primary/50 cursor-default"
                      onClick={() =>
                        toast.info(
                          "Bạn chỉ được đánh giá sau khi trải nghiệm phim"
                        )
                      }
                    >
                      Đánh giá
                    </p>
                  ) : item?.status_cmt && item?.status_cmt === 2 ? (
                    <button
                      className="text-primary hover:underline"
                      onClick={() => handleGetIdTicket(item._id)}
                    >
                      Đánh giá
                    </button>
                  ) : item?.status_cmt && item?.status_cmt === 3 ? (
                    <p
                      className="cursor-default"
                      onClick={() => toast.info("Bạn đã đánh giá phim này")}
                    >
                      Đã đánh giá
                    </p>
                  ) : (
                    <p
                      className="text-primary/50 cursor-default"
                      onClick={() => toast.info("Bạn chưa đặt vé phim này")}
                    >
                      Đánh giá
                    </p>
                  )}
                </td>
              </tr>
            ))}
            <tr className="bg-background! border-t-1 border-t-foreground">
              <td colSpan={6}>
                {" "}
                <div className="flex items-center justify-end gap-5 p-5 py-3">
                  <div>
                    Hiển thị {(page - 1) * (newData?.pagination.limit || 5) + 1}
                    –
                    {Math.min(
                      page * (newData?.pagination.limit || 5),
                      newData?.pagination.total || 5
                    )}{" "}
                    của {newData?.pagination.total} mục
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => setPage(page - 1)}
                      className={`flex-center text-3xl text-foreground  cursor-pointer                   ${
                        page === 1 ? "text-gray-400 pointer-events-none" : ""
                      }`}
                    >
                      <BiChevronLeft />
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      className={`flex-center text-3xl text-foreground  cursor-pointer           ${
                        newData?.pagination.totalPages &&
                        page === newData?.pagination.totalPages
                          ? "text-gray-400 pointer-events-none"
                          : ""
                      } `}
                    >
                      <BiChevronRight />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};

export default TableTicket;
