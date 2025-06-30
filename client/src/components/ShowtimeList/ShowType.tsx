import Link from "next/link";

const TimeScreening = ({ value }: { value: string }) => (
  <Link
    href={"/booking"}
    className="flex-center py-2 px-4 border-2 border-primary w-fit rounded-[5px] text-sm cursor-pointer hover:bg-primary hover:text-white transition-all"
  >
    {value}
  </Link>
);
const ShowType = ({
  type,
  data,
}: {
  type: string;
  data?: {
    id_room: string;
    time: string;
    showtype: string;
  }[];
}) => (
  <div className="flex gap-7.5 items-center">
    <p className="w-25">{type}</p>
    <div className="flex gap-2.5 flex-wrap">
      {data?.map((item) => (
        <TimeScreening value={item.time} key={item.time} />
      ))}
    </div>
  </div>
);
export default ShowType;
