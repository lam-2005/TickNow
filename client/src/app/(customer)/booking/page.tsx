"use client";
import StageBooking from "@/components/BookingPageComponents/StageBooking";
import Booking from "@/components/BookingPageComponents/Stages/Booking";
import Payment from "@/components/BookingPageComponents/Stages/Payment";
import { useStage } from "@/hooks/contexts/useStage";
import React from "react";

const BookingPage = () => {
  const { stage } = useStage();

  return (
    <div className="container space-y-[50px] mt-10">
      <StageBooking currentStage={stage} />
      {stage === 1 && <Booking />}
      {stage === 2 && <Payment />}
    </div>
  );
};

export default BookingPage;
