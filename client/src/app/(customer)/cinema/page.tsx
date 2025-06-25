// import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
"use client";
import React, { useEffect } from "react";
import Location from "./Location";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
// import Select, { SelectField } from "@/components/Select/Select";
// import { RiMapPin2Fill } from "react-icons/ri";
import { Cinema } from "@/interfaces/cinema.interface";
import { getCinemaList } from "@/services/cinema.service";
const Cinema = () => {
  const [cinemas, setCinemas] = React.useState<Cinema[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const getCinema = async () => {
    try {
      const res = await getCinemaList();
      console.log(res);
      setCinemas(res?.cinema);
    } catch (error) {
      console.error("Fetch movie failed:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCinema();
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <BackgroundPage image="background_cinema.webp" title="Rạp chiếu">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          {/* <Select>
            <SelectField
              id="cinema"
              openId={openId}
              setOpenId={setOpenId}
              data={cinemas}
              getOptionLabel={(item) => item.name}
              getOptionValue={(item) => item._id}
              defaultSelected={null}
              placeholder="Chọn ngày chiếu"
              valueSelect={handleGetDate}
            />
          </Select> */}
        </div>
      </BackgroundPage>
      <div className="mt-17.5 container">
        <h2 className="text-center mt-20">Hiển thị 6 rạp</h2>
        <div className="mt-7.5 grid grid-cols-4 justify-items-center gap-7.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {cinemas.map((cinema) => (
            <Location key={cinema._id} data={cinema} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cinema;
