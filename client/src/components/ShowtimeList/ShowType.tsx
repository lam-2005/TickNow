import Link from "next/link";

const TimeScreening = ({ value }: { value: string }) => (
  <div className="flex-center py-2 px-4 border-2 border-primary w-fit rounded-[5px] text-sm cursor-pointer hover:bg-primary hover:text-white transition-all">
    {value}
  </div>
);
const ShowType = ({
  type,
  data,
}: {
  type: string;
  data?: {
    id: string;
    time: string;
    showtype: string;
  }[];
}) => {
  return (
    <div className="flex gap-7.5 items-center">
      <p className="w-25">{type}</p>
      <div className="flex gap-2.5 flex-wrap">
        {data?.map((item) => (
          <Link key={item.id} href={`/booking/${item.id}`}>
            <TimeScreening value={item.time} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ShowType;
