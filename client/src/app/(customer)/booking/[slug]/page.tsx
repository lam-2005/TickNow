"use client";
import StageBooking from "@/components/BookingPageComponents/StageBooking";
import Booking from "@/components/BookingPageComponents/Stages/Booking";
import Payment from "@/components/BookingPageComponents/Stages/Payment";
import { useStage } from "@/hooks/contexts/useStage";
import { getRooom } from "@/services/room.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookingPage = () => {
  const { stage } = useStage();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [showtime, setShowtime] = useState<any>([]);

  const { slug } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await getRooom(`/${slug}`);
      console.log(res);
    };
    getData();
  }, [slug]);
  return (
    <div className="container space-y-[50px] mt-10">
      <StageBooking currentStage={stage} />
      {stage === 1 && <Booking />}
      {stage === 2 && <Payment />}
    </div>
  );
};

export default BookingPage;
