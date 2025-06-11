"use client";
import { useRouter } from "next/navigation";
import React from "react";
import TicketPopup from "@/components/Popup/TicketPopup";
import { MovieType } from "@/interfaces/movie.interface";
import usePopup from "@/hooks/usePopup";
const Profile = () => {
  const router = useRouter();
  const {ticketPopup, openTicket, closeTicket} = usePopup()
   return (
    <div className="container flex-column items-center mt-10 gap-10">
      {ticketPopup && (
        <TicketPopup info={{} as MovieType} onClose={closeTicket}/>
      )}
      <h2>Thông tin cá nhân</h2>
      <div className="space-x-10">
        <button
          onClick={() => router.push("/profile")}
          className="[&.active]:bg-primary [&.active]:border-transparent [&.active]:text-white py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm"
        >
          Tài khoản của tôi
        </button>
        <button className="active [&.active]:bg-primary [&.active]:border-transparent [&.active]:text-white py-2.5 px-5 rounded-[100px] font-bold hover:bg-primary hover:text-white hover:border-transparent transition-colors duration-300 border-1 border-foreground text-sm">
          Lịch sử đặt vé
        </button>
      </div>
      <table border={0} className="w-full">
        <thead className="[&_th]:text-center [&_th]:py-2 [&_th]:px-4 [&_th]:text-sm [&_th]:font-semibold border-1 border-primary">
          <tr className="bg-primary text-white">
            <th className="">Mã đặt vé</th>
            <th className="">Ngày giao dịch</th>
            <th className="">Tên phim</th>
            <th className="">Chi tiết vé</th>
            <th className="">Hành động</th>
          </tr>
        </thead>
        <tbody className="[&_tr]:even:bg-background-card border-1 border-foreground">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">#123456</td>
              <td className="py-2">01/01/2023</td>
              <td className="py-2 line-clamp-1">Phim chiếu rạp</td>
              <td className="py-2">
                <button className="text-primary hover:underline" onClick={openTicket}>Xem</button>
              </td>
              <td className="py-2">
                <button className="text-primary hover:underline">
                  Đánh giá phim
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
