import BookingPageContainer from "@/components/BookingPageComponents/BookingPageContainer";
import { getScreeningList } from "@/services/screening.service";
import React from "react";

const BookingPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getScreeningList(`/${slug}`);

  const data = res.data;
  const fetchShowtimes = async () => {
    try {
      const res = await getScreeningList();
      return res.data.result;
    } catch (error) {
      console.error("Lỗi khi tải suất chiếu:", error);
    }
  };
  const showtimes = await fetchShowtimes();

  return (
    <div className="container flex-column gap-[50px] mt-10">
      <BookingPageContainer data={data} showtimes={showtimes} />
    </div>
  );
};

export default BookingPage;
