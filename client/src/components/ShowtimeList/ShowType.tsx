"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TimeScreening = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => (
  <div
    className={`flex-center py-1 px-4 border-2 border-primary w-fit rounded-[5px] text-sm cursor-pointer hover:bg-primary hover:text-white transition-all ${className}`}
  >
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
    showtype: string | number;
  }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsScreening = useSearchParams();
  const getSearchParamScreening = searchParamsScreening.get("showtime") || "";
  console.log(pathname);
  const handleChangeShowtime = (id: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("showtime", id);
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };
  return (
    <div className="flex gap-7.5 items-center">
      <p className="w-25">{type}</p>
      <div className="flex gap-2.5 flex-wrap">
        {data?.map((item) => (
          <button key={item.id} onClick={() => handleChangeShowtime(item.id)}>
            {" "}
            <TimeScreening
              value={item.time}
              className={`${
                getSearchParamScreening === item.id
                  ? "bg-primary text-white "
                  : ""
              } `}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ShowType;
