import Payment from "@/components/BookingPageComponents/Payment/Payment";
import Ticket from "@/components/Movie/Ticket";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="flex gap-5 mt-10 container">
      <div className="space-y-5 bg-background-card p-5 rounded-[10px] max-w-7/10 w-full h-fit">
        <h2>Thông tin vé</h2>
        <Ticket />
      </div>
      <Payment />
    </div>
  );
};

export default PaymentPage;
