import { CinemaShowtimeType } from "@/interfaces/screening.interface";
import CinemaShowtime from "./CinemaShowtime";
import { v4 as uuidv4 } from "uuid";
type Props = {
  data: CinemaShowtimeType[];
  loading: boolean;
};
const CinemaShowtimeContainer = ({ data, loading }: Props) => {
  console.log(data);

  if (loading)
    return (
      <p className=" text-center p-5 rounded-[10px]">
        Đang tải dữ liêu suất chiếu...
      </p>
    );
  if (data.length === 0)
    return (
      <p className="bg-background-card text-center p-5 rounded-[10px] max-w-[1000px] w-full mx-auto">
        Hiện không có rạp nào
      </p>
    );
  return (
    <div className="flex-column items-center gap-7.5">
      <h1>Danh sách rạp</h1>
      <div className="flex-column gap-10 max-w-[1000px] w-full">
        {data.map((cinema) => (
          <CinemaShowtime key={uuidv4()} data={cinema} />
        ))}
      </div>
    </div>
  );
};

export default CinemaShowtimeContainer;
