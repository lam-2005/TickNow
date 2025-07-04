"use client";
import React, { useEffect, useState } from "react";
import LocationItem from "./Location";
import { Cinema, Location } from "@/interfaces/cinema.interface";
import BackgroundPage from "@/components/BackgroundPage/BackgroundPage";
import FilterCinema from "./FilterCinema";
import { getCinemaList } from "@/services/cinema.service";

const CinemaList = ({ data }: { data: Location[] }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCinemaList(`/?locationId=${selectedLocation}`);
        setCinemas(res.cinema);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu lịch chiếu: ", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [selectedLocation]);
  return (
    <>
      <BackgroundPage image="background_cinema.webp" title="Rạp chiếu">
        <div className=" absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
          <FilterCinema
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            locations={data}
          />
        </div>
      </BackgroundPage>
      <div className="mt-17.5 container">
        <h2 className="text-center mt-20">Hiển thị {cinemas.length} rạp</h2>
        <div className="mt-7.5 grid grid-cols-4 justify-center gap-7.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {loading ? (
            <p className="text-center">Đang tải dữ liệu...</p>
          ) : (
            cinemas.map((cinema: Cinema) => (
              <LocationItem key={cinema._id} data={cinema} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CinemaList;
