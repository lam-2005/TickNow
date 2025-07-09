import {
  CinemaShowtimeType,
  DetailScreening,
} from "@/interfaces/screening.interface";
import CinemaShowtime from "./CinemaShowtime";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getScreeningList } from "@/services/screening.service";
import Booking from "@/components/BookingPageComponents/Stages/Booking";
type Props = {
  data: CinemaShowtimeType[];
  loading: boolean;
};
const CinemaShowtimeContainer = ({ data, loading }: Props) => {
  const [loadingShowtime, setLoadingShowtime] = useState(true);
  const [showtimeId, setShowtimeId] = useState<DetailScreening | null>(null);
  const searchParams = useSearchParams();
  const getShowtimeId = searchParams.get("showtime") || "";
  const bookingSectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!getShowtimeId) {
        setLoadingShowtime(false);
        return;
      }
      setLoadingShowtime(true);
      const res = await getScreeningList(`/${getShowtimeId}`);
      setShowtimeId(res.data);
      setLoadingShowtime(false);
    };
    fetchShowtimes();
  }, [getShowtimeId]);
  useEffect(() => {
    if (showtimeId && bookingSectionRef.current) {
      setTimeout(() => {
        bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [showtimeId]);
  return (
    <>
      {loading ? (
        <p className=" text-center p-5 rounded-[10px]">
          Đang tải dữ liêu suất chiếu...
        </p>
      ) : data.length === 0 ? (
        <p className="bg-background-card text-center p-5 rounded-[10px] max-w-[1000px] w-full mx-auto">
          Hiện không có rạp nào
        </p>
      ) : (
        <div className="flex-column items-center gap-7.5">
          <h1>Danh sách rạp</h1>
          <div className="flex-column gap-10 max-w-[1000px] w-full">
            {data.map((cinema) => (
              <CinemaShowtime key={uuidv4()} data={cinema} />
            ))}
          </div>
        </div>
      )}
      {getShowtimeId && loadingShowtime && (
        <p className="text-center">Đang tải phòng...</p>
      )}
      {getShowtimeId && !loadingShowtime && (
        <div
          className="flex-column items-center gap-7.5"
          ref={bookingSectionRef}
        >

          <h2>Chọn ghế - Phòng {showtimeId?.room.code_room}</h2>
          <div className="flex-column gap-10 max-w-[1000px] w-full">
            {showtimeId?.room.diagram && (
              <Booking roomLayout={showtimeId.room.diagram} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CinemaShowtimeContainer;
