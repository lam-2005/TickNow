import Payment from "@/components/BookingPageComponents/Payment/Payment";
import Ticket from "@/components/Movie/Ticket";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Thanh toán",
};
const PaymentPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-10 container px-4">
      <div className="h-fit w-full lg:w-7/12 bg-background-card p-5 rounded-[10px]">
        <h2 className="text-xl font-semibold mb-5">Thông tin vé</h2>
        <Ticket />
      </div>
      <div className="w-full lg:w-5/12">
        <Payment />
      </div>
    </div>
  );
};

export default PaymentPage;
