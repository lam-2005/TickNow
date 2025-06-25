"use client";
import { ButtonPlay } from "@/components/Button/ButtonOfItemMovie";
import TrailerPopup from "@/components/Popup/TrailerPopup";
import Select, { SelectField } from "@/components/Select/Select";
// import Select, { SelectField } from "@/components/Select/Select";
import { ShowType } from "@/components/ShowtimeList/ShowtimeCard";
import env from "@/configs/environment";
import { useTheme } from "@/hooks/contexts/useTheme";
import usePopup from "@/hooks/usePopup";
import { Cinema } from "@/interfaces/cinema.interface";
import { MovieType } from "@/interfaces/movie.interface";
import { Screening } from "@/interfaces/screening.interface";
import { getCinemaList, getLocationList } from "@/services/cinema.service";
import { getMovieList } from "@/services/movie.service";
import { getScreeningList } from "@/services/screening.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";
// import { FaCalendarAlt } from "react-icons/fa";
// import { RiMapPin2Fill } from "react-icons/ri";
const CinemaShowtime = ({ data }: { data: any }) => {
  return (
    <div className="space-y-5 bg-background-card rounded-[10px] p-5 w-full">
      <div className="w-full">
        <h2>{data.name}</h2>
      </div>
      <div className="space-y-5">
        <p>{data.location.deatil_location}</p>
        <ShowType type="Phụ đề" data={data} />
      </div>
    </div>
  );
};

const Movie = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const { trailerPopup, openTrailer, closeTrailer } = usePopup();
  const { theme } = useTheme();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [showtime, setShowtime] = useState<any>([]);
  const [showtimes, setShowtimes] = useState<Screening[]>([]);
  const [location, setLocation] = useState<
    { _id: string | number; name: string }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<
    { value: string; label: string } | ""
  >("");

  const [selectedLocation, setSelectedLocation] = useState<
    { _id: string | number; name: string } | ""
  >("");

  const { slug } = useParams();
  const handleGetLocation = (locationId: any) => {
    setSelectedLocation(locationId);
  };
  const handleGetDate = (date: any) => {
    setSelectedDate(date);
  };
  // dữ liệu suất
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const res = await getScreeningList();
        setShowtimes(res?.data);
      } catch (error) {
        console.error("Lỗi khi tải suất chiếu:", error);
      }
    };
    fetchShowtimes();
  }, []);
  // dữ liệu rạp
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await getLocationList();
        setLocation(res?.location);
      } catch (error) {
        console.error("Lỗi khi tải địa chỉ:", error);
      }
    };
    fetchLocation();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const res = await getMovieList(`/${slug}`);

      setMovie(res?.data.movie);
      setShowtime(res?.data);
    };
    getData();
  }, [slug]);
  useEffect(() => {
    const getData = async () => {
      const res = await getMovieList(
        `/${slug}?date=${
          selectedDate ? selectedDate.value : "2025-06-15"
        }&location=${selectedLocation ? selectedLocation._id : location[0]}`
      );
      setShowtime(res?.data);
    };
    getData();
  }, [selectedDate, selectedLocation]);
  if (!movie) return <p>Loading...</p>;

  console.log(showtime);
  const date = new Date(movie.release_date);
  const formatDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("vi-VN")
    : "Đang Cập Nhật";
  const getDate = [...new Set(showtimes.map((item) => item.date))].map(
    (date) => {
      const d = new Date(date);
      const weekday = d.toLocaleDateString("vi-VN", { weekday: "long" });
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();

      const label = `${weekday}, ${day}/${month}/${year}`;
      return {
        value: d.toISOString().split("T")[0],
        label: label,
      };
    }
  );
  console.log(getDate[0]);
  return (
    <div>
      {trailerPopup && (
        <TrailerPopup
          name={movie.name}
          url={movie.trailer}
          onClose={closeTrailer}
        />
      )}
      {/* Banner */}
      <div className="relative w-screen max-h-[500px] h-full aspect-video text-white">
        <div className="bg-amber-300 w-full h-full brightness-50 relative">
          {" "}
          <Image
            src={`${env.IMG_API_URL}/banner/${movie.banner}`}
            alt={movie.name}
            fill
            priority
            sizes="1280px"
            className="object-cover
            "
          />
          <div
            aria-hidden="true"
            className={`${
              theme === "dark"
                ? "bg-gradient-to-t from-[rgba(7,7,7)] via-[rgba(7,7,7,0.5)] to-[rgba(7,7,7,0)] "
                : " "
            } bottom-0 Z-1000 w-full h-1/2 absolute`}
          ></div>
        </div>
        <div className="container flex gap-[25px] w-full absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="relative max-w-[204px] max-h-[300px] aspect-[2/3] w-full bg-red-400 rounded-[15px]">
            <Image
              src={`${env.IMG_API_URL}/movie/${movie.image}`}
              alt={movie.name}
              fill
              priority
              sizes="1280px"
              className="object-cover
            "
            />
            <ButtonPlay
              onClick={openTrailer}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
            />
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <h1>{movie.name}</h1>
              <span className="bg-primary py-0.5 px-2 rounded-[5px] font-semibold italic text-white">
                {movie.age}+
              </span>
            </div>

            <div className="flex gap-5 [&_div]:not-first:before:w-px [&_div]:not-first:before:h-[12px] [&_div]:not-first:before:bg-white [&_div]:not-first:before:absolute [&_div]:not-first:relative [&_div]:not-first:before:-left-2.5 [&_div]:not-first:before:top-1/2 [&_div]:not-first:before:-translate-y-1/2">
              <div>0.0/10</div>
              <div>{movie.duration} phút</div>
              <div>
                {movie.genre
                  .map((item) => {
                    return item.name;
                  })
                  .join(", ")}
              </div>
              <div>{date.getFullYear()}</div>
            </div>

            <p className="line-clamp-2 text-white">{movie.description}</p>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Công chiếu</strong>
              <span className="text-white">{formatDate}</span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Đạo diễn</strong>
              <span className="text-white">
                {movie.director || "Đang Cập Nhật"}
              </span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Diễn viên</strong>
              <span className="text-white">
                {movie.actor || "Đang Cập Nhật"}
              </span>
            </div>
            <div className="flex gap-7.5 items-center">
              <strong className="block w-[95px]">Ngôn ngữ</strong>
              <span className="text-white">{"Đang cập nhật"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-10 space-y-10">
        <div className="flex-column items-center gap-7.5">
          <h1>Lịch chiếu phim</h1>
          <Select>
            <SelectField
              icon={<FaCalendarAlt />}
              id="date"
              openId={openId}
              setOpenId={setOpenId}
              data={getDate}
              getOptionLabel={(item) => item.label}
              getOptionValue={(item) => item.value}
              defaultSelected={getDate[0]}
              placeholder={getDate[0].label}
              valueSelect={handleGetDate}
            />
            <SelectField
              icon={<RiMapPin2Fill />}
              id="location"
              openId={openId}
              setOpenId={setOpenId}
              data={location}
              getOptionLabel={(item) => item.name}
              getOptionValue={(item) => item._id}
              defaultSelected={location[0]}
              valueSelect={handleGetLocation}
              placeholder="Chọn vị trí"
            />
          </Select>
        </div>
        <div className="flex-column items-center gap-7.5">
          <h1>Danh sách rạp</h1>
          <div className="flex-column gap-10 max-w-[1000px] w-full">
            {!showtime ? (
              <p>Loading...</p>
            ) : showtime.cinemas.length !== 0 ? (
              showtime.cinemas.map((cinema: any) => (
                <CinemaShowtime key={cinema.id} data={cinema} />
              ))
            ) : (
              <p className="bg-background-card text-center p-5 rounded-[10px]">
                Hiện không có rạp nào
              </p>
            )}
          </div>
        </div>
        <div className="bg-background-card p-5 rounded-[10px]">
          <h2>Bình luận từ người xem</h2>
          <div className="w-full mt-2.5">
            <div className="flex gap-2.5 items-center">
              <span className="text-yellow-400 text-3xl">
                <FaStar />
              </span>
              <p>
                <span className="text-3xl font-bold">0.0</span>/5.0{"  "}
                <span className="text-sm">(0 Đánh giá)</span>
              </p>
            </div>
            <div className="space-y-2.5 mt-2.5">
              <div className="flex gap-5 items-center">
                <div className="size-11 rounded-full bg-amber-500"></div>
                <div className="">
                  <div className="">Phan Phúc Lâm</div>
                  <span className="text-xs">1 giờ trước</span>
                </div>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                fuga perspiciatis dolore nulla, cum iste, beatae voluptate culpa
                eius, delectus consequatur expedita voluptatem dolores
                accusantium? Itaque dolore voluptatibus nostrum quibusdam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
