import {
  CinemaShowtimeType,
  DetailScreening,
} from "@/interfaces/screening.interface";
import CinemaShowtime from "./CinemaShowtime";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { getScreeningList } from "@/services/screening.service";
import Booking from "@/components/BookingPageComponents/Stages/Booking";
import {
  getTicket,
  saveTicket,
  TicketTypeLocalStorage,
} from "@/utils/saveTicket";
import { useSearchParams } from "next/navigation";
import LoadingSpin from "@/components/LoadingAPI/LoadingSpin";
import socket from "@/configs/socket.config";
type Props = {
  data: CinemaShowtimeType[];
  loading: boolean;
};
const CinemaShowtimeContainer = ({ data, loading }: Props) => {
  const searchParams = useSearchParams();
  const getDateParams = searchParams.get("showtime") || "";
  const [ticket, setTicket] = useState<TicketTypeLocalStorage | null>(null);
  const [idShowtime, setIdShowtime] = useState(getDateParams);
  const [loadingShowtime, setLoadingShowtime] = useState(false);
  const [dataShowtime, setDataShowtime] = useState<DetailScreening | null>(
    null
  );
  const bookingSectionRef = useRef<HTMLDivElement | null>(null);

  // lấy localStorage khi web vừa load
  useEffect(() => {
    const storedTicket = getTicket();
    setTicket(storedTicket);
  }, []);

  // lấy cái searchParams showtime để làm idShowtime
  useEffect(() => {
    setIdShowtime(getDateParams);
  }, [getDateParams]);

  // dung fcasi id showtime để tải dữ liệu
  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!idShowtime) return;

      setLoadingShowtime(true);
      try {
        const res = await getScreeningList(`/${idShowtime}`);
        setDataShowtime(res?.data);

        // Cập nhật thông tin phòng chiếu vào vé
      } catch (err) {
        console.error("Lỗi khi lấy suất chiếu", err);
      } finally {
        setLoadingShowtime(false);
      }
    };
    fetchShowtimes();
  }, [idShowtime]);

  // lưu local
  useEffect(() => {
    if (ticket && dataShowtime) {
      const updatedTicket: TicketTypeLocalStorage = {
        ...ticket,
        screening: {
          room: dataShowtime.room.code_room,
          cinema: dataShowtime.room.cinema ?? "",
          screeningInfo: dataShowtime.screening,
          locationData: {
            location: dataShowtime.room.location?.location || "",
            detail_location: dataShowtime.room.location?.deatil_location || "",
            id_location: dataShowtime.room.location?.id_location || "",
          },
        },
      };
      saveTicket(updatedTicket);
      setTicket(updatedTicket);
    }
  }, [dataShowtime]);

  // k có param thì reset dữ liệu
  useEffect(() => {
    if (!searchParams.get("showtime")) {
      setIdShowtime("");
      setDataShowtime(null);
    }
  }, [data]);

  // di chuyển xuống chỗ chọn ghế
  useEffect(() => {
    if (dataShowtime && bookingSectionRef.current && ticket) {
      setTimeout(() => {
        bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [dataShowtime]);

  // ...
  const handleGetIdShowtime = (id?: string) => {
    if (id) {
      setIdShowtime(id);
    }
  };
  useEffect(() => {
    if (dataShowtime) {
      socket.emit("join_room", dataShowtime.room._id);
      console.log("Joined room:", dataShowtime.room._id);
    }

    // Lắng nghe sự kiện cập nhật vé
    socket.on("room_data_changed", ({ id_screening: updatedId }) => {
      console.log(updatedId);

      if (updatedId === dataShowtime?._id) {
        console.log("📡 Có ghế mới được đặt! Đang tải lại...");
      }
    });
    return () => {
      socket.off("room_data_changed");
    };
  }, [dataShowtime?.room._id, dataShowtime?._id]);

  return (
    <>
      {loading ? (
        <div className="flex gap-4 items-center justify-center">
          <LoadingSpin className="size-6!" /> <p>Đang tải dữ liệu rạp</p>
        </div>
      ) : data.length === 0 ? (
        <p className="bg-background-card text-center p-5 rounded-[10px] max-w-[1000px] w-full mx-auto">
          Hiện không có rạp nào
        </p>
      ) : (
        <div className="flex-column items-center gap-7.5 max-sm:gap-2">
          <h1>Danh sách rạp</h1>
          <div className="flex-column gap-10 max-w-[1000px] w-full">
            {data.map((cinema) => (
              <CinemaShowtime
                key={uuidv4()}
                data={cinema}
                onGetIdShowtime={handleGetIdShowtime}
                selectedShowtimeId={idShowtime}
              />
            ))}
          </div>
        </div>
      )}
      {idShowtime && loadingShowtime && (
        <div className="flex gap-4 items-center justify-center">
          <LoadingSpin className="size-6!" /> <p>Đang tải phòng</p>
        </div>
      )}
      {idShowtime && !loadingShowtime && (
        <div
          className="flex-column items-center gap-7.5 max-sm:gap-2"
          ref={bookingSectionRef}
        >
          <h2>Chọn ghế - Phòng {dataShowtime?.room.code_room}</h2>
          <div className="flex-column gap-10 max-w-[1000px] w-full">
            {dataShowtime?.room.diagram && (
              <Booking roomLayout={dataShowtime.room.diagram} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CinemaShowtimeContainer;
